// types/events.ts
export type EventItem = {
  id: string;
  layout: "hero" | "card";
  title: string;
  slug: string;
  date: string; // Format: DD.MM.YYYY
  category?: string;
  excerpt?: string;
  contributors?: string;
  image?: {
    url: string;
    alt: string;
    aspectRatio?: "landscape" | "portrait";
  };
};
