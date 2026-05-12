import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const collections = [
  "for-business",
  "design",
  "portfolios",
  "behind-the-build",
  "guides",
  "case-studies",
] as const;

export const GET: APIRoute = async () => {
  const allPosts = (
    await Promise.all(
      collections.map((col) =>
        getCollection(col)
          .then((entries) =>
            entries
              .filter((e) => !e.data.draft)
              .map((e) => ({
                collection:  col,
                title:       e.data.title,
                description: e.data.description,
                tags:        e.data.tags ?? [],
                url:         `/${col}/${e.id}`,
              }))
          )
          .catch(() => [])
      )
    )
  ).flat();

  return new Response(JSON.stringify(allPosts), {
    headers: { "Content-Type": "application/json" },
  });
};