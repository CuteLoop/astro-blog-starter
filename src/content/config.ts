import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    author: z.string().default("Joel"),
    theme: z
      .enum([
        "sprinkle-brownie",
        "sprinkle-field",
        "galaxy-donut",
        "blueberry-nebula",
        "starry-night",
      ])
      .optional(),
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
