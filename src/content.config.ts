import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';  // ← z from zod directly

const postSchema = ({ image }: { image: Function }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    subcategory: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
});

export const collections = {
    'for-business': defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/for-business' }),
        schema: postSchema,
    }),
    'design': defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/design' }),
        schema: postSchema,
    }),
    'portfolios': defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/portfolios' }),
        schema: postSchema,
    }),
    'behind-the-build': defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/behind-the-build' }),
        schema: postSchema,
    }),
    'guides': defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
        schema: postSchema,
    }),
    'case-studies': defineCollection({
        loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
        schema: postSchema,
    }),
};