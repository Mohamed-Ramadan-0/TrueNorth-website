import type { Post } from './post';
import { POSTS } from './posts.generated';
import type { Lang } from '../core/lang.service';

export function postsFor(lang: Lang): Post[] {
  return POSTS.filter((p) => p.lang === lang);
}

export function findPost(lang: Lang, slug: string): Post | undefined {
  return POSTS.find((p) => p.lang === lang && p.slug === slug);
}

/** Base paths of this article in each language it exists in. */
export function translations(post: Post): Partial<Record<Lang, string>> {
  const out: Partial<Record<Lang, string>> = {};
  for (const p of POSTS) if (p.key === post.key) out[p.lang] = `/blog/${p.slug}`;
  return out;
}
