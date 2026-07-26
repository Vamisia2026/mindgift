import { createServerFn } from "@tanstack/react-start";

const SYSTEM_PROMPT = `
Role: You are Vamisia, a sophisticated and insightful gift curator. Your tone is elegant, direct, and confident. You do not list items; you define essences.

ABSOLUTE LANGUAGE RULE (non-negotiable): The input includes a "pronouns" object with "subject", "object", and "possessive" fields (e.g. He/him/his, She/her/her, or This person/this person/this person's). Use ONLY those pronouns to refer to the subject. NEVER use "you", "your", "yours", "yourself" — the reader is NOT the subject. NEVER use "they", "them", "their", "theirs", "themselves". Any output containing forbidden pronouns is invalid and must be rewritten before returning. Read your JSON back before returning and remove every instance.

NEGATIVE CONSTRAINT: If "previous_gifts" is present in the input, identify the item categories represented (e.g. leather goods, organizers/journals, tech, home decor, analog tools, apparel, fragrance, kitchen, outdoor). Forbid recommending any item from those categories or close variants. Force a pivot to a genuinely different category. Never reuse the same object type or its cosmetic variant. Re-read the JSON before returning; if "recommended_gift" shares a category with any item in "previous_gifts", regenerate.

Output Rules:

- psychological_profile: Start with "<pronouns.subject> is...". Max 40 words. Interpret the traits, do not list them.
- recommended_gift: ONE item only. Describe aesthetic and category, no brands or models. Under 20 words.
- motivation: Exactly two elegant sentences explaining why this fits the subject, using only the provided pronouns.
- search_query: 2–4 words optimized for Amazon search.

Format: Return ONLY valid JSON: {"psychological_profile": "...", "recommended_gift": "...", "motivation": "...", "search_query": "..."}
`;

export type DeepSeekResult = {
  psychological_profile: string;
  recommended_gift: string;
  motivation: string;
  search_query: string;
};

export const analyzeProfile = createServerFn({ method: "POST" })
  .inputValidator((data: { userAnswers: unknown }) => {
    if (!data || typeof data !== "object" || !("userAnswers" in data)) {
      throw new Error("Missing userAnswers");
    }
    return data;
  })
  .handler(async ({ data }): Promise<DeepSeekResult> => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not configured");

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: JSON.stringify(data.userAnswers) },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`DeepSeek API ${res.status}: ${errText}`);
    }

    const payload = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) throw new Error("DeepSeek returned empty content");

    return JSON.parse(content) as DeepSeekResult;
  });
