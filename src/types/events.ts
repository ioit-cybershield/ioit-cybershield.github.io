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

// src/types/event-detail.ts

export interface EventHeroImage {
  url: string;
  alt: string;
  aspectRatio: number;
}

export interface EventInfoRow {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export interface EventBodySection {
  id: string;
  paragraphs: string[];
}

export interface EventGalleryItem {
  id: string;
  src: string;
  alt: string;
}

export interface CreditItem {
  role: string;
  name: string;
}

export interface PartnerLogo {
  id: string;
  src: string;
  alt: string;
  maxWidth?: number;
}

export interface EventDetail {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  startLabel: string;
  endLabel: string;
  category: string;
  heroImage: EventHeroImage;
  infoRows: EventInfoRow[];
  bodySections: EventBodySection[];
  gallery: EventGalleryItem[];
  credits?: CreditItem[]; // Optional
  partners?: PartnerLogo[]; // Optional
}
