import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { LangService } from '../../core/lang.service';
import { SITE, absoluteUrl } from '../../core/site';
import { findPost, postsFor, translations } from '../../content/posts';
import { SiteDatePipe } from './site-date.pipe';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'tn-blog-post',
  imports: [RouterLink, SiteDatePipe, NotFoundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent {
  /** Bound from the :slug route param. */
  readonly slug = input.required<string>();
  readonly i18n = inject(LangService);
  readonly post = computed(() => findPost(this.i18n.lang(), this.slug()));
  readonly others = computed(() => postsFor(this.i18n.lang()).filter((p) => p.slug !== this.slug()).slice(0, 2));
  // Post HTML is compiled at build time from our own Markdown files, so it is trusted.
  readonly body = computed(() => {
    const p = this.post();
    return p ? this.sanitizer.bypassSecurityTrustHtml(p.html) : '';
  });

  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const p = this.post();
      if (!p) return;
      const t = this.i18n.t().blog;
      const path = `/blog/${p.slug}`;
      const url = absoluteUrl(this.i18n.link(path));
      seo.set({
        title: p.title,
        description: p.description,
        path,
        lang: p.lang,
        alternates: translations(p),
        type: 'article',
        publishedTime: p.date,
        modifiedTime: p.updated,
        schema: [
          {
            '@type': 'BlogPosting',
            '@id': `${url}#post`,
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            dateModified: p.updated,
            inLanguage: p.lang,
            keywords: p.tags.join(', '),
            mainEntityOfPage: url,
            image: absoluteUrl(`/og/${p.lang}.png`),
            author: { '@type': 'Organization', name: p.author, url: SITE.url },
            publisher: { '@id': absoluteUrl('/#org') },
          },
          breadcrumbs([
            { name: t.home, path: this.i18n.link('/') },
            { name: t.title, path: this.i18n.link('/blog') },
            { name: p.title, path: this.i18n.link(path) },
          ]),
        ],
      });
    });
  }
}
