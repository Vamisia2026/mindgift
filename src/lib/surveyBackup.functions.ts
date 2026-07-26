import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Zod schema mirrors the ExportBundle produced by /mini plus the recommendation
// resolved from DeepSeek and the two Amazon product links.
const PayloadSchema = z.object({
  screening: z.object({
    gender: z.string(),
    age: z.number().nullable(),
    age_group: z.string().nullable(),
    relationship: z.string(),
    occasion: z.string(),
  }),
  tags: z.array(z.string()),
  journey: z.array(
    z.object({
      tag: z.string(),
      areaId: z.string(),
      levelId: z.string(),
      label: z.string(),
    }),
  ),
  recommendation: z.object({
    recommended_gift: z.string(),
    psychological_profile: z.string(),
    motivation: z.string(),
  }),
  product_link_us: z.string(),
  product_link_uk: z.string(),
});

type Payload = z.infer<typeof PayloadSchema>;

const GATEWAY_BASE = "https://connector-gateway.lovable.dev/google_sheets/v4";
const HEADER_ROW = [
  "timestamp",
  "age_group",
  "relationship",
  "gender",
  "age",
  "occasion",
  "tags",
  "recommended_gift",
  "product_link_us",
  "product_link_uk",
  "psychological_profile",
  "motivation",
];

function buildRow(id: string, createdAt: string, p: Payload): string[] {
  return [
    createdAt,
    p.screening.age_group ?? "",
    p.screening.relationship,
    p.screening.gender,
    p.screening.age?.toString() ?? "",
    p.screening.occasion,
    p.tags.join(", "),
    p.recommendation.recommended_gift,
    p.product_link_us,
    p.product_link_uk,
    p.recommendation.psychological_profile,
    p.recommendation.motivation,
    // id trails at the end for traceability but is not part of HEADER_ROW.
    // We intentionally keep the sheet width fixed at 13 columns (A:M).
    // If the id column becomes needed, add it to HEADER_ROW too.
  ].map((v) => (v == null ? "" : String(v)));
}

async function ensureHeaderRow(sheetId: string, lovableKey: string, connKey: string) {
  const headers: HeadersInit = {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": connKey,
  };
  const res = await fetch(
    `${GATEWAY_BASE}/spreadsheets/${sheetId}/values/Sheet1!A1:M1`,
    { headers },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets header check failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { values?: string[][] };
  if (json.values && json.values.length > 0 && json.values[0].length > 0) return;

  const write = await fetch(
    `${GATEWAY_BASE}/spreadsheets/${sheetId}/values/Sheet1!A1:M1?valueInputOption=RAW`,
    {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [HEADER_ROW] }),
    },
  );
  if (!write.ok) {
    const body = await write.text();
    throw new Error(`Sheets header write failed [${write.status}]: ${body}`);
  }
}

async function appendRow(
  sheetId: string,
  lovableKey: string,
  connKey: string,
  row: string[],
) {
  const res = await fetch(
    `${GATEWAY_BASE}/spreadsheets/${sheetId}/values/Sheet1!A:M:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets append failed [${res.status}]: ${body}`);
  }
}

export const backupSurveyResult = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => PayloadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const createdAt = new Date().toISOString();
    let insertedId: string | null = null;

    // 1. Persist to Supabase (source of truth) — but do NOT let a DB failure
    //    prevent the Google Sheets mirror. The sheet is the owner's backup
    //    of record; both writes should be attempted independently.
    try {
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("survey_results")
        .insert({
          screening: data.screening,
          tags: data.tags,
          journey: data.journey,
          recommendation: data.recommendation,
          product_link_us: data.product_link_us,
          product_link_uk: data.product_link_uk,
        })
        .select("id, created_at")
        .single();
      if (insertError || !inserted) {
        console.error("[surveyBackup] Supabase insert failed:", insertError);
      } else {
        insertedId = inserted.id;
      }
    } catch (err) {
      console.error("[surveyBackup] Supabase insert threw:", err);
    }

    // 2. Google Sheets mirror. Log verbose HTTP failures so we can diagnose.
    const sheetId = process.env.VAMISIA_SHEETS_ID;
    const lovableKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;

    if (!sheetId || !lovableKey || !connKey) {
      console.warn("[surveyBackup] Skipping Sheets mirror — missing env vars.", {
        hasSheetId: !!sheetId,
        hasLovableKey: !!lovableKey,
        hasConnKey: !!connKey,
      });
      return { id: insertedId, sheets: "skipped" as const };
    }

    try {
      await ensureHeaderRow(sheetId, lovableKey, connKey);
      await appendRow(
        sheetId,
        lovableKey,
        connKey,
        buildRow(insertedId ?? "unsynced", createdAt, data),
      );
      if (insertedId) {
        await supabaseAdmin
          .from("survey_results")
          .update({ sheets_synced_at: new Date().toISOString() })
          .eq("id", insertedId);
      }
      return { id: insertedId, sheets: "ok" as const };
    } catch (err) {
      console.error("[surveyBackup] Sheets mirror failed:", err);
      return { id: insertedId, sheets: "failed" as const };
    }
  });
