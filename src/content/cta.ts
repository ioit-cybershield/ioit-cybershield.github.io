// src/content/cta.ts
export interface CtaContent {
  headingLine1: string;
  headingLine2: string;
  subhead: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

const FALLBACK_CTA: CtaContent = {
  headingLine1: "You don’t get many",
  headingLine2: "chances to be early.",
  subhead: "To lead, not follow.",
  body:
    "To shape what cybersecurity becomes — not just adapt to it.\n\n" +
    "CYBERSHIELD IS ALREADY IN THE HANDS OF TEAMS REWRITING THE RULES. " +
    "IF YOU’RE READY, WE’LL MAKE ROOM FOR YOU.",
  primaryLabel: "REQUEST ACCESS >>",
  primaryHref: "/request-access",
  secondaryLabel: "TALK TO OUR TEAM >>",
  secondaryHref: "/contact",
};

const ADMIN_API_URL =
  import.meta.env.ADMIN_API_URL ??
  // backwards-compat with footer's env name
  (import.meta.env.ADMINAPIURL as string | undefined) ??
  "http://localhost:3000";

async function fetchCta(): Promise<CtaContent> {
  try {
    const res = await fetch(`${ADMIN_API_URL}/api/landing/cta`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch CTA: ${res.status}`);
    }

    const json = await res.json();
    const c = json.cta ?? json;

    return {
      headingLine1: c.headingLine1 ?? FALLBACK_CTA.headingLine1,
      headingLine2: c.headingLine2 ?? FALLBACK_CTA.headingLine2,
      subhead: c.subhead ?? FALLBACK_CTA.subhead,
      body: c.body ?? FALLBACK_CTA.body,
      primaryLabel: c.primaryLabel ?? FALLBACK_CTA.primaryLabel,
      primaryHref: c.primaryHref ?? FALLBACK_CTA.primaryHref,
      secondaryLabel: c.secondaryLabel ?? FALLBACK_CTA.secondaryLabel,
      secondaryHref: c.secondaryHref ?? FALLBACK_CTA.secondaryHref,
    };
  } catch (error) {
    console.error("Failed to fetch CTA content, using defaults.", error);
    return FALLBACK_CTA;
  }
}

export const ctaContent: CtaContent = await fetchCta();
