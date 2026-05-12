import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif}'
);

export async function getPostImage(cover: string): Promise<ImageMetadata | null> {
  const importer = images[cover];
  if (!importer) return null;
  const mod = await importer();
  return mod.default;
}