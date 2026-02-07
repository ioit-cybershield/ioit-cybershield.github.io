// import { type RevealItem } from "@/components/ui/reveal-gallery";
import { PUBLIC_ADMIN_API_URL } from "@/scripts/config.mjs";
// const PUBLIC_ADMIN_API_URL = import.meta.env.PUBLIC_ADMIN_API_URL;

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
  imageSrc: string;
  content?: React.ReactNode;
};

// const PUBLIC_ADMIN_API_URL = import.meta.env.PUBLIC_ADMIN_API_URL;
console.log("Using PUBLIC_ADMIN_API_URL:", PUBLIC_ADMIN_API_URL);
// Helper: derive local static path from blob path + id
function getLocalImagePath(item: GalleryItemContent): string {
  const extMatch = item.imageBlobPath.match(/\.[a-zA-Z0-9]+$/);
  const ext = extMatch ? extMatch[0].toLowerCase() : ".jpg";
  return `/gallery/${item.id}${ext}`;
}

async function fetchGallery(): Promise<GalleryItemContent[]> {
  try {
    const res = await fetch(
      `${PUBLIC_ADMIN_API_URL}/api/landing/gallery?landingOnly=true`,
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
        imageBlobPath: item.imageBlobPath,
        imageUrl: item.imageUrl,
        imageAlt: item.imageAlt,
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

export const galleryContent: GalleryItemContent[] = await fetchGallery();
