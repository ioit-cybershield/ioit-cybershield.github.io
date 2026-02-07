// src/content/hero.ts
const PUBLIC_ADMIN_API_URL = import.meta.env.PUBLIC_ADMIN_API_URL;

export type LandingHeroContent = {
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  bottomLine1: string;
  bottomLine2: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

async function fetchHero(): Promise<LandingHeroContent> {
  try {
    const res = await fetch(`${PUBLIC_ADMIN_API_URL}/api/landing/hero`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch hero: ${res.status}`);
    }

    const data = await res.json();
    const hero = data.hero as LandingHeroContent;

    return hero;
  } catch (error) {
    console.error("Failed to fetch hero content, using defaults.", error);
    // Fallback so the site still builds
    return {
      titleLine1: "Cyber-Security",
      titleLine2: "FOR",
      titleLine3: "Everyone",
      bottomLine1: "EMPOWERING A COMMUNITY",
      bottomLine2: "WHERE STUDENTS CONNECT, LEARN & LEAD",
      primaryLabel: "Join CyberShield",
      primaryHref: "/contact",
      secondaryLabel: "View upcoming events",
      secondaryHref: "/events",
    };
  }
}

export const heroContent = await fetchHero();
