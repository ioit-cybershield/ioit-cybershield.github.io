import { type RevealItem } from "@/components/ui/reveal-gallery";

export type GalleryItemContent = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  buttonLabel?: string;
  buttonHref?: string;
  imageBlobPath: string;
  imageUrl: string;
  imageAlt: string;
};

const ADMIN_API_URL = process.env.ADMIN_API_URL;

// Helper: derive local static path from blob path + id
function getLocalImagePath(item: GalleryItemContent): string {
  const extMatch = item.imageBlobPath.match(/\.[a-zA-Z0-9]+$/);
  const ext = extMatch ? extMatch[0].toLowerCase() : ".jpg";
  return `/gallery/${item.id}${ext}`;
}

async function fetchGallery(): Promise<RevealItem[]> {
  try {
    const res = await fetch(
      `${ADMIN_API_URL}/api/landing/gallery?landingOnly=true`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch gallery: ${res.status}`);
    }

    const json = await res.json();
    const items = (json.items ?? []) as GalleryItemContent[];

    const landing = items.filter((i) => i.id).slice(0, 3);

    return landing.map((item) => {
      const localPath = getLocalImagePath(item);

      // In dev, you may not be running the mirror script, so fall back to Blob URL.
      const imageSrc = import.meta.env.DEV ? item.imageUrl : localPath;

      return {
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        imageSrc,
        description: item.description,
        tags: item.tags ?? [],
        buttonLabel: item.buttonLabel,
        buttonHref: item.buttonHref,
      };
    });
  } catch (error) {
    console.error(
      "Failed to fetch gallery content, using empty gallery.",
      error,
    );
    return [];
  }
}

export const GALLERY_ITEMS: RevealItem[] = await fetchGallery();
