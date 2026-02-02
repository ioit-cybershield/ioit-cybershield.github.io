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

export type EventInfoRow = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export type EventBodySection = {
  id: string;
  title?: string;
  paragraphs: string[];
};

export type EventGalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type EventDetail = {
  slug: string;
  title: string;
  startDate: string; // ISO: 2025-11-07
  endDate: string; // ISO: 2026-02-15
  // Display labels for the header (e.g. "07.11", "15.02.2026")
  startLabel: string;
  endLabel: string;
  category: string;
  heroImage: {
    url: string;
    alt: string;
    aspectRatio?: number; // e.g. 1.75
  };
  infoRows: EventInfoRow[];
  bodySections: EventBodySection[];
  gallery: EventGalleryImage[];
};
