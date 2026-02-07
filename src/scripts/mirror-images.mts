// scripts/mirror-gallery-images.mts
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
// import dotenv from "dotenv";

// dotenv.config();

const PUBLIC_ADMIN_API_URL = process.env.PUBLIC_ADMIN_API_URL;

if (!PUBLIC_ADMIN_API_URL) {
  console.error(
    "PUBLIC_ADMIN_API_URL is not set; skipping gallery image mirroring.",
  );
  process.exit(0);
}

type AdminGalleryItem = {
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
  slot?: number | null;
  isVisible: boolean;
};

async function main() {
  const res = await fetch(
    `${PUBLIC_ADMIN_API_URL}/api/landing/gallery?landingOnly=true`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch gallery: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const items = (json.items ?? []) as AdminGalleryItem[];

  const landingItems = items
    .filter((i) => i.isVisible && i.slot != null)
    .sort((a, b) => (a.slot ?? 0) - (b.slot ?? 0))
    .slice(0, 3);

  const publicGalleryDir = path.join(process.cwd(), "public", "gallery");
  fs.mkdirSync(publicGalleryDir, { recursive: true });

  for (const item of landingItems) {
    // Derive extension from imageBlobPath; fallback to .jpg
    const extMatch = item.imageBlobPath.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : ".jpg";
    const fileName = `${item.id}${ext}`;
    const filePath = path.join(publicGalleryDir, fileName);

    const imgRes = await fetch(item.imageUrl);
    if (!imgRes.ok) {
      throw new Error(
        `Failed to download image for gallery item ${item.id}: ${imgRes.status} ${imgRes.statusText}`,
      );
    }

    const buf = Buffer.from(await imgRes.arrayBuffer());
    fs.writeFileSync(filePath, buf);

    console.log(`Saved gallery image: /public/gallery/${fileName}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
