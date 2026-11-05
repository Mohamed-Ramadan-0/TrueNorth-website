import { RenderMode, ServerRoute } from '@angular/ssr';
import { POSTS } from './content/posts.generated';

/** Every known page is prerendered to static HTML at build time; unknown URLs are rendered on the server as 404. */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'solutions/ecommerce', renderMode: RenderMode.Prerender },
  { path: 'book-demo', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => POSTS.map((p) => ({ slug: p.slug })),
  },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
