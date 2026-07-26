// Deterministic, tag-driven macro-area routing for /mini.
//
// Rationale: options only carry a `tag` — the DB has no per-option "next area"
// pointer. To make the journey feel tree-like without touching schema, we walk
// eligible macro_areas in a stable order that is biased by the tags collected
// so far. Given the same first answer, the same subsequent area is picked.

export type MacroAreaHint = { id: string; sort_order: number; title: string };

// Map a tag family prefix ("lifestyle-*", "aesthetic-*", ...) to keyword hints
// that we look for in a macro-area title. Kept small on purpose — this is a
// bias, not a hard router.
const FAMILY_KEYWORDS: Record<string, string[]> = {
  aesthetic: ["style", "aesthetic", "space", "environment", "design"],
  lifestyle: ["nature", "city", "travel", "social", "leisure"],
  values: ["values", "philosophy", "meaning", "impact"],
  work: ["work", "career", "professional", "leadership", "meeting"],
  tech: ["tech", "digital", "ai"],
  fitness: ["fitness", "sport", "body", "wellness"],
  travel: ["travel", "adventure", "nature", "city"],
  art: ["art", "culture", "creative"],
  finance: ["finance", "money", "wealth"],
  pet: ["pet", "animal"],
  style: ["style", "grooming", "attire"],
  gift: ["gift"],
};

function familyOf(tag: string): string {
  return (tag.split("-")[0] ?? "").toLowerCase();
}

function affinityScore(title: string, tagFamilies: string[]): number {
  const t = title.toLowerCase();
  let score = 0;
  for (const fam of tagFamilies) {
    const kws = FAMILY_KEYWORDS[fam];
    if (!kws) continue;
    for (const kw of kws) if (t.includes(kw)) score += 1;
  }
  return score;
}

/**
 * Order eligible macro-areas so that areas whose title matches the collected
 * tag families come first. Ties broken by DB `sort_order` (deterministic).
 * Areas in `terminated` (user hit "I DON'T KNOW") are excluded.
 */
export function orderAreas(
  eligible: MacroAreaHint[],
  collectedTags: string[],
  terminated: Set<string>,
): string[] {
  const families = Array.from(new Set(collectedTags.map(familyOf).filter(Boolean)));
  return eligible
    .filter((a) => !terminated.has(a.id))
    .map((a) => ({ id: a.id, s: affinityScore(a.title, families), o: a.sort_order }))
    .sort((a, b) => (b.s - a.s) || (a.o - b.o))
    .map((a) => a.id);
}

export type Pronouns = { subject: string; object: string; possessive: string };

/**
 * Enforce third-person pronouns on LLM output.
 * Strips both second-person ("you/your") and third-person plural ("they/their")
 * pronouns, substituting the caller-provided subject/object/possessive triple.
 */
export function enforcePronouns(text: string, p: Pronouns): string {
  if (!text) return text;
  const sub = p.subject;
  const subLower = sub.charAt(0).toLowerCase() + sub.slice(1);
  const obj = p.object;
  const objCap = obj.charAt(0).toUpperCase() + obj.slice(1);
  const pos = p.possessive;
  const posCap = pos.charAt(0).toUpperCase() + pos.slice(1);

  const rules: [RegExp, string][] = [
    // third-person plural
    [/\btheirs\b/g, pos],
    [/\bthemselves\b/g, objLowerSafe(obj)],
    [/\btheir\b/g, pos],
    [/\bthem\b/g, obj],
    [/\bthey're\b/gi, `${sub} is`],
    [/\bthey've\b/gi, `${sub} has`],
    [/\bthey'll\b/gi, `${sub} will`],
    [/\bthey'd\b/gi, `${sub} would`],
    [/\bthey\b/g, subLower],
    [/\bTheirs\b/g, posCap],
    [/\bTheir\b/g, posCap],
    [/\bThem\b/g, objCap],
    [/\bThey\b/g, sub],
    // second-person
    [/\byourself\b/gi, obj],
    [/\byours\b/gi, pos],
    [/\byour\b/g, pos],
    [/\bYour\b/g, posCap],
    [/\byou\b/g, subLower],
    [/\bYou\b/g, sub],
  ];
  let out = text;
  for (const [re, rep] of rules) out = out.replace(re, rep);
  return out;
}

function objLowerSafe(o: string): string {
  return o.charAt(0).toLowerCase() + o.slice(1);
}

/** Legacy alias — kept for backward compatibility. */
export function stripTheyThem(text: string): string {
  return enforcePronouns(text, {
    subject: "This person",
    object: "this person",
    possessive: "this person's",
  });
}
