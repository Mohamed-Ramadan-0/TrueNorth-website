import { ChangeDetectionStrategy, Component, PLATFORM_ID, RESPONSE_INIT, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { SeoService } from '../../core/seo.service';
import { LangService } from '../../core/lang.service';

@Component({
  selector: 'tn-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().notFound;
    <section class="page-hero page-hero-tight">
      <div class="wrap">
        <h1 class="h1">{{ t.title }}</h1>
        <p class="lede">{{ t.lede }}</p>
        <div class="actions-row">
          <a [routerLink]="i18n.link('/')" class="btn btn-signal">{{ t.home }}</a>
          <a [routerLink]="i18n.link('/blog')" class="btn btn-outline">{{ t.blog }}</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundComponent {
  readonly i18n = inject(LangService);

  constructor() {
    const t = this.i18n.t().notFound;
    inject(SeoService).set({ title: t.seoTitle, description: t.lede, path: '/404', lang: this.i18n.lang(), noindex: true });
    const init = inject(RESPONSE_INIT, { optional: true });
    if (init && isPlatformServer(inject(PLATFORM_ID))) init.status = 404;
  }
}
