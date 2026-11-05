import { ChangeDetectionStrategy, Component, computed, inject, input, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { SITE, absoluteUrl } from '../../core/site';
import { POSTS } from '../../content/posts.generated';
import { ArabicDatePipe } from './arabic-date.pipe';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'tn-blog-post',
  imports: [RouterLink, ArabicDatePipe, NotFoundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent {
  /** Bound from the :slug route param. */
  readonly slug = input.required<string>();
  readonly post = computed(() => POSTS.find((p) => p.slug === this.slug()));
  readonly others = computed(() => POSTS.filter((p) => p.slug !== this.slug()).slice(0, 2));
  // Post HTML is compiled at build time from our own Markdown files, so it is trusted.
  readonly body = computed(() => {
    const p = this.post();
    return p ? this.sanitizer.bypassSecurityTrustHtml(p.html) : '';
  });

  private readonly sanitizer = inject(DomSanitizer);
  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => {
      const p = this.post();
      if (!p) return;
      const path = `/blog/${p.slug}`;
      this.seo.set({
        title: p.title,
        description: p.description,
        path,
        type: 'article',
        publishedTime: p.date,
        modifiedTime: p.updated,
        schema: [
          {
            '@type': 'BlogPosting',
            '@id': absoluteUrl(`${path}#post`),
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            dateModified: p.updated,
            inLanguage: 'ar',
            keywords: p.tags.join(', '),
            mainEntityOfPage: absoluteUrl(path),
            image: absoluteUrl(SITE.ogImage),
            author: { '@type': 'Organization', name: p.author, url: SITE.url },
            publisher: { '@id': absoluteUrl('/#org') },
          },
          breadcrumbs([
            { name: 'الرئيسية', path: '/' },
            { name: 'المدونة', path: '/blog' },
            { name: p.title, path },
          ]),
        ],
      });
    });
  }
}
