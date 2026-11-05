import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { LangService } from '../../core/lang.service';
import { SITE, absoluteUrl } from '../../core/site';
import { postsFor } from '../../content/posts';
import { SiteDatePipe } from './site-date.pipe';

@Component({
  selector: 'tn-blog-list',
  imports: [RouterLink, SiteDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().blog;
    <section class="page-hero page-hero-tight">
      <div class="wrap">
        <h1 class="h1">{{ t.title }}</h1>
        <p class="lede">{{ t.lede }}</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        @if (posts().length) {
          <ul class="blog-index">
            @for (p of posts(); track p.slug) {
              <li>
                <article>
                  <time [attr.datetime]="p.date">{{ p.date | siteDate: i18n.lang() }}</time>
                  <div>
                    <h2><a [routerLink]="i18n.link('/blog/' + p.slug)">{{ p.title }}</a></h2>
                    <p>{{ p.description }}</p>
                    <span class="meta">{{ p.readingMinutes }} {{ t.minutes }}</span>
                  </div>
                </article>
              </li>
            }
          </ul>
        } @else {
          <p class="lede">{{ t.empty }}</p>
        }
      </div>
    </section>
  `,
})
export class BlogListComponent {
  readonly i18n = inject(LangService);
  readonly posts = computed(() => postsFor(this.i18n.lang()));

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const lang = this.i18n.lang();
      const t = this.i18n.t().blog;
      seo.set({
        title: t.seoTitle,
        description: t.seoDescription,
        path: '/blog',
        lang,
        schema: [
          {
            '@type': 'Blog',
            '@id': absoluteUrl(this.i18n.link('/blog') + '#blog'),
            name: `${SITE.name} ${t.title}`,
            url: absoluteUrl(this.i18n.link('/blog')),
            inLanguage: lang,
            publisher: { '@id': absoluteUrl('/#org') },
            blogPost: this.posts().map((p) => ({
              '@type': 'BlogPosting', headline: p.title, url: absoluteUrl(this.i18n.link(`/blog/${p.slug}`)), datePublished: p.date,
            })),
          },
          breadcrumbs([{ name: t.home, path: this.i18n.link('/') }, { name: t.title, path: this.i18n.link('/blog') }]),
        ],
      });
    });
  }
}
