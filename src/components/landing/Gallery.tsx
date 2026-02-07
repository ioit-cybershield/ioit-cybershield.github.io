// src/components/landing/Gallery.tsx
import RevealGallery from "@/components/ui/reveal-gallery";
import { type GalleryItemContent } from "@/content/gallery";

export default function Gallery({
  galleryContent,
}: {
  galleryContent: GalleryItemContent[];
}) {
  return <RevealGallery items={galleryContent} />;
}
