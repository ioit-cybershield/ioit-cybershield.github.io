// src/components/landing/Gallery.tsx
import RevealGallery from "@/components/ui/reveal-gallery";
import { GALLERY_ITEMS } from "@/content/gallery";

export default function Gallery() {
  return <RevealGallery items={GALLERY_ITEMS} />;
}
