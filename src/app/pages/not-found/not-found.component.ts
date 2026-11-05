import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { RESPONSE_INIT } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'tn-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero page-hero-tight">
      <div class="wrap">
        <h1 class="h1">الصفحة دي مش موجودة</h1>
        <p class="lede">ممكن الرابط اتغير أو فيه حرف غلط. ابدأ من الرئيسية أو شوف المدونة.</p>
        <div class="actions-row">
          <a routerLink="/" class="btn btn-signal">الصفحة الرئيسية</a>
          <a routerLink="/blog" class="btn btn-outline">المدونة</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundComponent {
  constructor() {
    inject(SeoService).set({ title: 'الصفحة مش موجودة', description: 'الصفحة اللي بتدور عليها مش موجودة.', path: '/404', noindex: true });
    const init = inject(RESPONSE_INIT, { optional: true });
    if (init && isPlatformServer(inject(PLATFORM_ID))) init.status = 404;
  }
}
