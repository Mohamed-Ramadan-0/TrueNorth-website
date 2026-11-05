import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { LangService } from '../../core/lang.service';
import { absoluteUrl } from '../../core/site';
import { SOLUTIONS } from '../../content/solutions';

@Component({
  selector: 'tn-solutions',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().solutionsPage;
    <section class="page-hero">
      <div class="wrap">
        <nav class="crumbs" aria-label="breadcrumb"><a [routerLink]="i18n.link('/')">{{ t.home }}</a><span aria-hidden="true">/</span><span>{{ t.title }}</span></nav>
        <h1 class="h1">{{ t.title }}</h1>
        <p class="lede">{{ t.lede }}</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <ol class="sol-index">
          @for (s of solutions(); track s.slug) {
            <li [class.is-live]="s.kind === 'live'">
              <div class="sol-head">
                <h2><a [routerLink]="i18n.link('/solutions/' + s.slug)">{{ s.name }}</a></h2>
                <span class="pill" [class.pill-on]="s.kind === 'live'">{{ s.state }}</span>
              </div>
              <p class="sol-title">{{ s.title }}</p>
              <p class="muted">{{ s.summary }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class SolutionsComponent {
  readonly i18n = inject(LangService);
  readonly solutions = computed(() => SOLUTIONS[this.i18n.lang()]);

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const lang = this.i18n.lang();
      const t = this.i18n.t();
      seo.set({
        title: t.solutionsPage.seoTitle,
        description: t.solutionsPage.seoDescription,
        path: '/solutions',
        lang,
        schema: [
          {
            '@type': 'ItemList',
            itemListElement: SOLUTIONS[lang].map((s, i) => ({
              '@type': 'ListItem', position: i + 1, name: s.name, url: absoluteUrl(this.i18n.link(`/solutions/${s.slug}`)),
            })),
          },
          breadcrumbs([{ name: t.solutionsPage.home, path: this.i18n.link('/') }, { name: t.solutionsPage.title, path: this.i18n.link('/solutions') }]),
        ],
      });
    });
  }
}
