import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { LangService } from '../../core/lang.service';
import { absoluteUrl } from '../../core/site';
import { MarkComponent } from '../../shared/mark.component';

@Component({
  selector: 'tn-company',
  imports: [RouterLink, MarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().company;
    <section class="page-hero">
      <div class="wrap">
        <nav class="crumbs" aria-label="breadcrumb"><a [routerLink]="i18n.link('/')">{{ i18n.t().solution.home }}</a><span aria-hidden="true">/</span><span>{{ t.seoTitle }}</span></nav>
        <h1 class="h1">{{ t.title }}</h1>
        <p class="lede">{{ t.lede }}</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap mv">
        <div><h2 class="mv-label">{{ t.missionLabel }}</h2><p class="mv-text">{{ t.mission }}</p></div>
        <div><h2 class="mv-label">{{ t.visionLabel }}</h2><p class="mv-text">{{ t.vision }}</p></div>
      </div>
    </section>

    <section class="section section-ink">
      <div class="wrap split name-block">
        <tn-mark [size]="120" class="big-mark" />
        <div>
          <h2 class="h2">{{ t.nameTitle }}</h2>
          <p class="lede-sm name-body">{{ t.nameBody }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <h2 class="h2">{{ t.differentTitle }}</h2>
        <dl class="ledger">
          @for (d of t.different; track d.t) { <div><dt>{{ d.t }}</dt><dd>{{ d.b }}</dd></div> }
        </dl>
      </div>
    </section>

    <section class="section section-alt">
      <div class="wrap split">
        <h2 class="h2">{{ t.voiceTitle }}</h2>
        <p class="voice">{{ t.voice }}</p>
      </div>
    </section>

    <section class="section section-ink">
      <div class="wrap split">
        <h2 class="h2">{{ i18n.t().home.ctaTitle }}</h2>
        <div class="cta-actions"><a [routerLink]="i18n.link('/contact')" class="btn btn-signal">{{ i18n.t().nav.contact }}</a></div>
      </div>
    </section>
  `,
  styles: `
    .mv { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 5rem); }
    .mv > div { border-top: 2px solid var(--ink); padding-top: 1.2rem; }
    .mv-label { font-size: 1rem; font-weight: 700; color: var(--signal-ink); margin: 0 0 .8rem; }
    .mv-text { font-family: var(--display); font-size: clamp(1.35rem, 2.4vw, 1.85rem); line-height: 1.5; margin: 0; max-width: 30ch; }
    .name-block { align-items: center; }
    .big-mark { color: var(--paper); justify-self: center; }
    .name-body { max-width: 52ch; }
    .voice { font-size: 1.2rem; margin: 0; max-width: 52ch; }
    @media (max-width: 760px) { .mv { grid-template-columns: 1fr; } .big-mark { justify-self: start; } }
  `,
})
export class CompanyComponent {
  readonly i18n = inject(LangService);

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const lang = this.i18n.lang();
      const t = this.i18n.t();
      seo.set({
        title: t.company.seoTitle,
        description: t.company.seoDescription,
        path: '/company',
        lang,
        schema: [
          { '@type': 'AboutPage', name: t.company.title, url: absoluteUrl(this.i18n.link('/company')), about: { '@id': absoluteUrl('/#org') } },
          breadcrumbs([{ name: t.solution.home, path: this.i18n.link('/') }, { name: t.company.seoTitle, path: this.i18n.link('/company') }]),
        ],
      });
    });
  }
}
