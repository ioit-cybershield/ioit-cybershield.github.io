export type EventItem = {
  id: string;
  date: string; // ISO YYYY-MM-DD
  title: string;
  time?: string;
  summary: string;
  description?: string;
  images?: string[]; // Changed from single image to array
  link?: string;
  location?: string;
};
