import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Jean-Baptiste Janssen'),
    tags: z.array(z.string()),
    chapters: z.number(),
    readingTime: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    author: z.string().default('Jean-Baptiste Janssen'),
  }),
});

export const collections = { guides, blog };
