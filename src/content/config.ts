import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),

    author: z.string().default("Joel"),

    // Theme per post (optional). Give it a default to keep pages/layouts simpler.
    theme: z
      .enum([
        "sprinkle-brownie",
        "sprinkle-field",
        "galaxy-donut",
        "blueberry-nebula",
        "starry-night",
      ])
      .optional()
      .default("starry-night"),

    // NEW: tags
    tags: z.array(z.string()).optional().default([]),

    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),

    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
