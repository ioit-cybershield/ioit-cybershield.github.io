// src/mock/event-detail-data.ts

import type { EventDetail } from "@/types/events";

const LA_SOCIETE_AUTOMATIQUE: EventDetail = {
  slug: "la-societe-automatique",
  title: "LA SOCIÉTÉ AUTOMATIQUE",
  startDate: "2025-11-07",
  endDate: "2026-02-15",
  startLabel: "07.11.2025",
  endLabel: "15.02.2026",
  category: "Exhibitions",
  heroImage: {
    url: "https://www.imal.org/media/pages/events/la-societe-automatique/3064778490-1760515024/orange_for_site.png",
    alt: "La Société Automatique Abstract Graphic",
    aspectRatio: 1.75,
  },
  infoRows: [
    {
      label: "Category",
      value: "Exhibitions",
      href: "https://www.imal.org/en/events/tag:Exhibitions",
    },
    {
      label: "In the framework of",
      value: "EUROPALIA ESPAÑA",
      href: "https://europalia.eu",
      external: true,
    },
    {
      label: "Co-Produced By",
      value:
        "iMAL, LABoral Centro de Arte y Creación Industrial, EUROPALIA and FWB",
    },
    {
      label: "An Exhibition By",
      value:
        "Félix Luque Sánchez, in collaboration with Vincent Evrard, Damien Gernay and Íñigo Bilbao Lopategui",
    },
    { label: "Opening Hours", value: "Wed-Sun ▪ 11am — 6pm" },
    { label: "Holidays", value: "⚠ Closed on 25/12/2025 and 01/01/2026" },
    {
      label: "Location",
      value: "iMAL",
      href: "https://www.imal.org/en/visit",
      external: false,
    },
  ],
  bodySections: [
    {
      id: "intro",
      paragraphs: [
        "After Chapter I (2009), Nihil Ex Nihilo (2010) and Memory Lane (2016), Felix Luque Sanchez returns to iMAL with a new solo exhibition. Eight new creations – produced with his regular collaborators Vincent Evrard, Damien Gernay and Íñigo Bilbao Lopategui – explore different facets of our Automatic Society.",
        "Choreography and performance: Mercedes Dassy / Music: Le Motel & Ben Bertrand.",
      ],
    },
    {
      id: "statement",
      paragraphs: [
        "“Have we not always had the deep-seated phantasy of a world that would go on without us? The poetic temptation to see the world in our absence, free of any human, all-too-human will?”",
        "— Jean Baudrillard – Why hasn't everything already disappeared",
        "Industrial robots are designed to perform repetitive tasks with near-perfect precision. They operate without hesitation, exhaustion or loss of concentration. This is the mastery of automation, a synchronised symphony.",
        "From Taylorism to contemporary artificial intelligence, the utopia of automation has become increasingly prevalent. Having already transformed the world of industrial production, it has now taken hold of our thinking, judgement and memory.",
        "This is the age of La Société Automatique (The Automatic Society), the title of a Bernard Stiegler lecture describing the total automation of our lives. All areas of existence are merging into an invisible network of computations; digital utilitarianism is supplanting human decisions, imposing efficiency-driven logic that reduces our scope for action. Technology is becoming the invisible architect of our lives.",
        "An already dystopian present, where education that critically engages with these opaque systems is key in securing the democratic reappropriation of technology.",
        "The exhibition La Société Automatique depicts the anxiety of a post-anthropic world where machines – Sisyphuses devoid of weariness or rebellion – threaten to erase us. A universe of automatons carrying out their self-contained, cyclical work, with no human purpose.",
      ],
    },
  ],
  gallery: [
    {
      id: "1",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/4172786240-1764939865/felix-luque-imal-2025-2445-2400x.jpg",
      alt: "Installation View 1",
    },
    {
      id: "2",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/4074729883-1764939865/felix-luque-imal-2025-2466-2400x.jpg",
      alt: "Installation View 2",
    },
    {
      id: "3",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/956678700-1764939866/felix-luque-imal-2025-2537-2400x.jpg",
      alt: "Installation View 3",
    },
    {
      id: "4",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/724868460-1764939865/felix-luque-imal-2025-2653-2400x.jpg",
      alt: "Installation View 4",
    },
    {
      id: "5",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/2858301050-1764939865/felix-luque-imal-2025-2708-2400x.jpg",
      alt: "Installation View 5",
    },
    {
      id: "6",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/3353444115-1764939865/felix-luque-imal-2025-2792-2400x.jpg",
      alt: "Installation View 6",
    },
  ],
  // Credits section moved from hard-coded to data-driven
  credits: [
    { role: "Music", name: "Le Motel & Ben Bertrand" },
    { role: "Choreography and performance", name: "Mercedes Dassy" },
    { role: "Exhibition design", name: "Nel Verbeke" },
    { role: "Photos", name: "Alexander Popelier" },
  ],
  // Partners section moved from hard-coded to data-driven
  partners: [
    {
      id: "1",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/120168437-1761232710/logo2_abxl.svg",
      alt: "Partner Logo",
      maxWidth: 160,
    },
    {
      id: "2",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/233211227-1761232710/logo2-bembajada-1440x.png",
      alt: "Partner Logo",
      maxWidth: 200,
    },
    {
      id: "3",
      src: "https://www.imal.org/media/pages/events/la-societe-automatique/462700860-1761232710/logo2_caecid.svg",
      alt: "Partner Logo",
      maxWidth: 180,
    },
  ],
};

export const EVENT_DETAILS: EventDetail[] = [LA_SOCIETE_AUTOMATIQUE];

export function getAllEventDetailSlugs(): string[] {
  return EVENT_DETAILS.map((e) => e.slug);
}

export function getEventDetailBySlug(slug: string): EventDetail | undefined {
  return EVENT_DETAILS.find((e) => e.slug === slug);
}
