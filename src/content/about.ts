// src/content/about.ts
export type AboutItem = {
  title: string;
  text: string;
};

export interface AboutContent {
  scribbleLabel: string;
  headline: string;
  items: AboutItem[];
  numberLeft: number;
  numberRight: number;
}

const ADMIN_API_URL = import.meta.env.ADMIN_API_URL ?? "http://localhost:3000";

async function fetchAbout(): Promise<AboutContent> {
  try {
    const res = await fetch(`${ADMIN_API_URL}/api/landing/about`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to load about content");

    const data = await res.json();
    const about = data.about;

    return {
      scribbleLabel: about.scribbleLabel,
      headline: about.headline,
      items: [
        { title: about.item1Title, text: about.item1Text },
        { title: about.item2Title, text: about.item2Text },
        { title: about.item3Title, text: about.item3Text },
      ],
      numberLeft: about.numberLeft,
      numberRight: about.numberRight,
    };
  } catch (error) {
    console.error("Failed to fetch about content", error);

    // Fallback to your current static copy
    return {
      scribbleLabel: "Why CyberShield?",
      headline:
        "Empowering cybersecurity enthusiasts to protect, defend, and lead in the digital world.",
      items: [
        {
          title: "Enhance cybersecurity skills",
          text: "Learn by doing through hands-on workshops, labs, and CTF-style challenges that build practical skills in ethical hacking, network security, and threat mitigation.",
        },
        {
          title: "Promote a security-first mindset",
          text: "Stay ahead of emerging threats with talks, demos, and discussions on the latest attacks, defenses, and ethical guidelines in cybersecurity.",
        },
        {
          title: "Foster collaboration and leadership",
          text: "Join a supportive community where members share knowledge, work on real-world projects, and connect with experts to solve genuine security challenges.",
        },
      ],
      numberLeft: 20,
      numberRight: 25,
    };
  }
}

export const aboutContent = await fetchAbout();
