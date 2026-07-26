import { supabase } from "@/integrations/supabase/client";

export type BudgetRange = { min: number; max: number };

export async function calculateBudget(
  relationship: string,
  occasion: string,
): Promise<BudgetRange> {
  const [basesRes, multRes] = await Promise.all([
    supabase
      .from("budget_bases")
      .select("min_budget, max_budget")
      .eq("relationship_key", relationship)
      .maybeSingle(),
    supabase
      .from("occasion_multipliers")
      .select("multiplier")
      .eq("occasion_key", occasion)
      .maybeSingle(),
  ]);

  if (basesRes.error) throw basesRes.error;
  if (multRes.error) throw multRes.error;
  if (!basesRes.data || !multRes.data) {
    throw new Error("Missing budget configuration for provided keys");
  }

  const multiplier = Number(multRes.data.multiplier);
  const factor = multiplier;

  const minFinal = Number(basesRes.data.min_budget) * factor;
  const maxFinal = Number(basesRes.data.max_budget) * factor;

  // Contract: Use exact min/max band, no widening.
  return {
    min: Math.round(minFinal),
    max: Math.round(maxFinal),
  };
}

export type AmazonRegion = "US" | "UK";

const REGION_CONFIG: Record<AmazonRegion, { domain: string; tag: string }> = {
  US: { domain: "com", tag: "vamisia-20" },
  UK: { domain: "co.uk", tag: "vamisia-21" },
};

export function buildAmazonLink(
  region: AmazonRegion,
  recommendedGift: string,
  range: BudgetRange,
): string {
  const { domain, tag } = REGION_CONFIG[region];
  const k = encodeURIComponent(recommendedGift);
  return `https://www.amazon.${domain}/s?k=${k}&low=${range.min}&high=${range.max}&tag=${tag}`;
}
