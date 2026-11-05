export interface Post {
  slug: string;
  lang: 'en' | 'ar';
  /** Shared by translations of the same article, for hreflang. */
  key: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  html: string;
}
