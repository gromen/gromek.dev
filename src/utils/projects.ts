import { getCollection } from 'astro:content';

/** Projects in progress first, then by `order` ascending, then by title. */
export const getSortedProjects = async () =>
  (await getCollection('projects')).sort(
    (a, b) =>
      Number(b.data.wip) - Number(a.data.wip) ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
