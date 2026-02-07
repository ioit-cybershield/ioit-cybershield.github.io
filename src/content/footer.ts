// src/content/footer.ts

import { PUBLIC_ADMIN_API_URL } from "@/scripts/config.mjs";

export type FooterGridLink = {
  label: string;
  href: string;
};

export type FooterLegalLink = {
  id: string;
  label: string;
  href: string;
  order: number;
};

export type FooterSocialLink = {
  id: string;
  platform: string;
  label: string;
  href: string;
  order: number;
};

export interface FooterContent {
  gridLinks: FooterGridLink[]; // 4 tiles
  homeLink: FooterGridLink;
  legalLinks: FooterLegalLink[];
  socialLinks: FooterSocialLink[];
  copyrightText: string;
}

// const PUBLIC_ADMIN_API_URL = import.meta.env.PUBLIC_ADMIN_API_URL;

// Fallback: matches your current static footer layout
const FALLBACK_FOOTER: FooterContent = {
  gridLinks: [
    { label: "Events", href: "/events" },
    { label: "About Us", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Join Us", href: "/contact" },
  ],
  homeLink: {
    label: "Home",
    href: "/",
  },
  legalLinks: [
    {
      id: "privacy-policy",
      label: "Privacy Policy",
      href: "/privacy-policy",
      order: 1,
    },
    {
      id: "terms",
      label: "Terms",
      href: "/terms",
      order: 2,
    },
    {
      id: "scam-prevention",
      label: "Scam Prevention",
      href: "/scam-prevention",
      order: 3,
    },
  ],
  socialLinks: [
    {
      id: "x",
      platform: "x",
      label: "Follow us on X",
      href: "https://x.com",
      order: 1,
    },
    {
      id: "linkedin",
      platform: "linkedin",
      label: "Connect on LinkedIn",
      href: "https://linkedin.com",
      order: 2,
    },
    {
      id: "instagram",
      platform: "instagram",
      label: "Follow us on Instagram",
      href: "https://instagram.com",
      order: 3,
    },
  ],
  copyrightText: "2026 CyberShield. All Rights Reserved.",
};

function normalizeLegalLinks(raw: any): FooterLegalLink[] {
  if (!Array.isArray(raw)) return FALLBACK_FOOTER.legalLinks;
  const items: FooterLegalLink[] = raw.map((item: any, index: number) => {
    const id =
      typeof item.id === "string" && item.id.trim()
        ? item.id
        : `legal-${index}`;
    const label = String(item.label ?? "").trim();
    const href = String(item.href ?? "").trim();
    const order = Number.isFinite(item.order) ? Number(item.order) : index + 1;
    return { id, label, href, order };
  });
  return items
    .filter((l) => l.label && l.href)
    .sort((a, b) => a.order - b.order);
}

function normalizeSocialLinks(raw: any): FooterSocialLink[] {
  if (!Array.isArray(raw)) return FALLBACK_FOOTER.socialLinks;
  const items: FooterSocialLink[] = raw.map((item: any, index: number) => {
    const id =
      typeof item.id === "string" && item.id.trim()
        ? item.id
        : `social-${index}`;
    const platform = String(item.platform ?? "").trim() || "custom";
    const label = String(item.label ?? "").trim() || platform;
    const href = String(item.href ?? "").trim();
    const order = Number.isFinite(item.order) ? Number(item.order) : index + 1;
    return { id, platform, label, href, order };
  });
  return items.filter((s) => s.href).sort((a, b) => a.order - b.order);
}

async function fetchFooter(): Promise<FooterContent> {
  try {
    const res = await fetch(`${PUBLIC_ADMIN_API_URL}/api/general/footer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch footer: ${res.status}`);
    }

    const json = await res.json();
    const f = json.footer ?? json;

    const gridLinks: FooterGridLink[] = [
      {
        label: f.gridLink1Label ?? FALLBACK_FOOTER.gridLinks[0].label,
        href: f.gridLink1Href ?? FALLBACK_FOOTER.gridLinks[0].href,
      },
      {
        label: f.gridLink2Label ?? FALLBACK_FOOTER.gridLinks[1].label,
        href: f.gridLink2Href ?? FALLBACK_FOOTER.gridLinks[1].href,
      },
      {
        label: f.gridLink3Label ?? FALLBACK_FOOTER.gridLinks[2].label,
        href: f.gridLink3Href ?? FALLBACK_FOOTER.gridLinks[2].href,
      },
      {
        label: f.gridLink4Label ?? FALLBACK_FOOTER.gridLinks[3].label,
        href: f.gridLink4Href ?? FALLBACK_FOOTER.gridLinks[3].href,
      },
    ];

    const homeLink: FooterGridLink = {
      label: f.homeLinkLabel ?? FALLBACK_FOOTER.homeLink.label,
      href: f.homeLinkHref ?? FALLBACK_FOOTER.homeLink.href,
    };

    const legalLinks = normalizeLegalLinks(f.legalLinks);
    const socialLinks = normalizeSocialLinks(f.socialLinks);

    const copyrightText = f.copyrightText ?? FALLBACK_FOOTER.copyrightText;

    return {
      gridLinks,
      homeLink,
      legalLinks,
      socialLinks,
      copyrightText,
    };
  } catch (error) {
    console.error("Failed to fetch footer content, using defaults.", error);
    return FALLBACK_FOOTER;
  }
}

export const footerContent: FooterContent = await fetchFooter();
