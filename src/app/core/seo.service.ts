import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE, absoluteUrl } from './site';
import { COPY } from '../content/copy';
import { Lang, localize } from './lang.service';

export interface PageSeo {
  title: string;
  description: string;
  /** Path without the language prefix, e.g. "/platform". */
  path: string;
  lang: Lang;
  /** Language versions of this page (base paths). Defaults to the same path in every language. */
  alternates?: Partial<Record<Lang, string>>;
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
    const localPath = localize(page.path, page.lang);
    const url = absoluteUrl(localPath);
    const copy = COPY[page.lang];
    const html = this.doc.documentElement;
    html.setAttribute('lang', page.lang);
    html.setAttribute('dir', page.lang === 'ar' ? 'rtl' : 'ltr');
    const image = absoluteUrl(page.image ?? `/og/${page.lang}.png`);
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
      'og:locale': copy.meta.locale,
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
    this.setAlternates(page.noindex ? {} : (page.alternates ?? { en: page.path, ar: page.path }));
    this.setJsonLd([...baseSchema(page.lang), ...(page.schema ?? [])]);
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

  private setAlternates(alts: Partial<Record<Lang, string>>): void {
    this.doc.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => l.remove());
    const add = (hreflang: string, href: string) => {
      const link = this.doc.createElement('link');
      link.rel = 'alternate';
      link.setAttribute('hreflang', hreflang);
      link.href = href;
      this.doc.head.appendChild(link);
    };
    for (const [lang, path] of Object.entries(alts) as [Lang, string][]) add(lang, absoluteUrl(localize(path, lang)));
    if (alts.en) add('x-default', absoluteUrl(alts.en));
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

function baseSchema(lang: Lang): Record<string, unknown>[] {
  return [
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#org'),
      name: SITE.name,
      alternateName: SITE.nameAr,
      slogan: COPY[lang].footer.tagline,
      url: SITE.url,
      logo: absoluteUrl('/icon-512.png'),
      email: SITE.email,
      description: COPY[lang].meta.siteDescription,
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      url: SITE.url,
      name: SITE.name,
      inLanguage: ['en', 'ar'],
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
