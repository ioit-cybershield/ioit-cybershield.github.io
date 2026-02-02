// src/mock/event-detail-data.ts
import type { EventDetail } from "../types/events";

export const MOCK_EVENT_DETAILS: EventDetail[] = [
  {
    slug: "la-societe-automatique",
    title: "La Société Automatique",
    startDate: "2025-11-07",
    endDate: "2026-02-15",
    startLabel: "07.11.2025",
    endLabel: "15.02.2026",
    category: "Exhibitions",
    heroImage: {
      url: "https://www.imal.org/media/pages/events/la-societe-automatique/3064778490-1760515024/orange_for_site.png",
      alt: "La Société Automatique poster",
      aspectRatio: 1.75,
    },
    infoRows: [
      {
        label: "Category",
        value: "Exhibitions",
        href: "https://www.imal.org/en/events/tag:Exhibitions",
      },
      {
        label: "IN THE FRAMEWORK OF",
        value: "EUROPALIA ESPAÑA",
        href: "https://europalia.eu/fr/espana",
        external: true,
      },
      {
        label: "CO-PRODUCED BY",
        value:
          "iMAL, LABoral Centro de Arte y Creación Industrial, EUROPALIA and FWB",
      },
      {
        label: "AN EXHIBITION BY",
        value:
          "Félix Luque Sánchez, in collaboration with Vincent Evrard, Damien Gernay and Íñigo Bilbao Lopategui",
      },
      {
        label: "OPENING HOURS",
        value: "Wed–Sun ▪ 11am — 6pm",
      },
      {
        label: "HOLIDAYS",
        value: "⚠ Closed on 25/12/2025 and 01/01/2026",
      },
      {
        label: "LOCATION",
        value: "iMAL",
        href: "https://www.imal.org/en/visit",
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
        id: "essay",
        paragraphs: [
          "“Have we not always had the deep-seated phantasy of a world that would go on without us? The poetic temptation to see the world in our absence, free of any human, all-too-human will?”",
          "— Jean Baudrillard – Why hasn’t everything already disappeared",
          "Industrial robots are designed to perform repetitive tasks with near-perfect precision. They operate without hesitation, exhaustion or loss of concentration. This is the mastery of automation, a synchronised symphony.",
          "From Taylorism to contemporary artificial intelligence, the utopia of automation has become increasingly prevalent. Having already transformed the world of industrial production, it has now taken hold of our thinking, judgement and memory.",
          "This is the age of La Société Automatique (The Automatic Society), the title of a Bernard Stiegler lecture describing the total automation of our lives. All areas of existence are merging into an invisible network of computations; digital utilitarianism is supplanting human decisions, imposing efficiency-driven logic that reduces our scope for action.",
          "The exhibition La Société Automatique depicts the anxiety of a post-anthropic world where machines threaten to erase us, a universe of automatons carrying out their self-contained, cyclical work.",
        ],
      },
    ],
    gallery: [
      {
        id: "g1",
        src: "https://www.imal.org/media/pages/events/la-societe-automatique/4172786240-1764939865/felix-luque-imal-2025-2445-2400x.jpg",
        alt: "Installation view 1",
      },
      {
        id: "g2",
        src: "https://www.imal.org/media/pages/events/la-societe-automatique/4074729883-1764939865/felix-luque-imal-2025-2466-2400x.jpg",
        alt: "Installation view 2",
      },
      {
        id: "g3",
        src: "https://www.imal.org/media/pages/events/la-societe-automatique/956678700-1764939866/felix-luque-imal-2025-2537-2400x.jpg",
        alt: "Installation view 3",
      },
      {
        id: "g4",
        src: "https://www.imal.org/media/pages/events/la-societe-automatique/724868460-1764939865/felix-luque-imal-2025-2653-2400x.jpg",
        alt: "Installation view 4",
      },
      {
        id: "g5",
        src: "https://www.imal.org/media/pages/events/la-societe-automatique/2858301050-1764939865/felix-luque-imal-2025-2708-2400x.jpg",
        alt: "Installation view 5",
      },
    ],
  },
];

export function getMockEventDetailBySlug(
  slug: string,
): EventDetail | undefined {
  return MOCK_EVENT_DETAILS.find((e) => e.slug === slug);
}
