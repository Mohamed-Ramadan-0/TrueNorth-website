import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE, absoluteUrl } from './site';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Extra schema.org nodes for this page, merged with Organization + WebSite. */
  schema?: Record<string, unknown>[];
}

/**
 * Sets title, description, canonical, Open Graph, Twitter and JSON-LD for a page.
 * Runs during SSR/prerender, so crawlers get the tags in the HTML.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(page: PageSeo): void {
    const url = absoluteUrl(page.path);
    const image = absoluteUrl(page.image ?? SITE.ogImage);
    const fullTitle = page.path === '/' ? page.title : `${page.title} | ${SITE.name}`;

    this.title.setTitle(fullTitle);
    const tags: Record<string, string> = {
      description: page.description,
      robots: page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
      'og:title': fullTitle,
      'og:description': page.description,
      'og:url': url,
      'og:type': page.type ?? 'website',
      'og:image': image,
      'og:site_name': SITE.name,
      'og:locale': SITE.locale,
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': page.description,
      'twitter:image': image,
    };
    for (const [key, content] of Object.entries(tags)) {
      const attr = key.startsWith('og:') ? 'property' : 'name';
      this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
    }
    for (const key of ['article:published_time', 'article:modified_time']) {
      this.meta.removeTag(`property="${key}"`);
    }
    if (page.publishedTime) {
      this.meta.addTag({ property: 'article:published_time', content: page.publishedTime });
      this.meta.addTag({ property: 'article:modified_time', content: page.modifiedTime ?? page.publishedTime });
    }

    this.setLink('canonical', url);
    this.setJsonLd([...baseSchema(), ...(page.schema ?? [])]);
  }

  private setLink(rel: string, href: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = rel;
      this.doc.head.appendChild(link);
    }
    link.href = href;
  }

  private setJsonLd(graph: Record<string, unknown>[]): void {
    let script = this.doc.head.querySelector<HTMLScriptElement>('script#ld-json');
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'ld-json';
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    // Escape "<" so post content can never close the script tag.
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  }
}

function baseSchema(): Record<string, unknown>[] {
  return [
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#org'),
      name: SITE.name,
      alternateName: SITE.nameAr,
      url: SITE.url,
      logo: absoluteUrl('/icon-512.png'),
      email: SITE.email,
      description: SITE.description,
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      url: SITE.url,
      name: SITE.name,
      inLanguage: 'ar',
      publisher: { '@id': absoluteUrl('/#org') },
    },
  ];
}

export function breadcrumbs(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
