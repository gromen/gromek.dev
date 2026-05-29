import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    descriptionEn: z.string(),
    url: z.string().url(),
    technologies: z.array(z.string()),
    image: z.string().optional(),
    category: z.enum(['independent', 'agency', 'special']),
    featured: z.boolean().default(false),
    wip: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects: projectsCollection,
};
