import { RenderMode, ServerRoute } from '@angular/ssr';
import { POSTS } from './content/posts.generated';
import { SOLUTIONS } from './content/solutions';

/** Every known page, in both languages, is prerendered to static HTML; unknown URLs render on the server as 404. */
const pages = (prefix: '' | 'ar/', lang: 'en' | 'ar'): ServerRoute[] => [
  { path: prefix || '', renderMode: RenderMode.Prerender },
  { path: `${prefix}solutions`, renderMode: RenderMode.Prerender },
  {
    path: `${prefix}solutions/:slug`,
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SOLUTIONS[lang].map((s) => ({ slug: s.slug })),
  },
  { path: `${prefix}platform`, renderMode: RenderMode.Prerender },
  { path: `${prefix}company`, renderMode: RenderMode.Prerender },
  { path: `${prefix}contact`, renderMode: RenderMode.Prerender },
  { path: `${prefix}blog`, renderMode: RenderMode.Prerender },
  {
    path: `${prefix}blog/:slug`,
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => POSTS.filter((p) => p.lang === lang).map((p) => ({ slug: p.slug })),
  },
];

export const serverRoutes: ServerRoute[] = [
  ...pages('ar/', 'ar').map((r) => (r.path === 'ar/' ? { ...r, path: 'ar' } : r)),
  ...pages('', 'en'),
  // Old v1 URL, permanently moved to /contact.
  { path: 'book-demo', renderMode: RenderMode.Server, status: 301 },
  { path: 'ar/book-demo', renderMode: RenderMode.Server, status: 301 },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
