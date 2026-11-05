import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { LangService } from '../../core/lang.service';
import { absoluteUrl } from '../../core/site';
import { SOLUTIONS } from '../../content/solutions';
import { ChatDemoComponent } from '../../shared/chat-demo.component';
import { LeadFormComponent } from '../../shared/lead-form.component';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'tn-solution',
  imports: [RouterLink, ChatDemoComponent, LeadFormComponent, NotFoundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solution.component.html',
})
export class SolutionComponent {
  /** Bound from the :slug route param. */
  readonly slug = input.required<string>();
  readonly i18n = inject(LangService);
  readonly s = computed(() => SOLUTIONS[this.i18n.lang()].find((x) => x.slug === this.slug()));
  /** Industry option to preselect in the form, by position in the list. */
  readonly industry = computed(() => {
    const idx = ['ecommerce', 'sales', 'real-estate'].indexOf(this.slug());
    return idx >= 0 ? this.i18n.t().form.industries[idx] : '';
  });

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const s = this.s();
      if (!s) return;
      const lang = this.i18n.lang();
      const t = this.i18n.t().solution;
      const path = `/solutions/${s.slug}`;
      seo.set({
        title: s.seoTitle,
        description: s.seoDescription,
        path,
        lang,
        schema: [
          {
            '@type': 'Service',
            name: s.seoTitle,
            description: s.seoDescription,
            serviceType: s.name,
            provider: { '@id': absoluteUrl('/#org') },
            url: absoluteUrl(this.i18n.link(path)),
          },
          breadcrumbs([
            { name: t.home, path: this.i18n.link('/') },
            { name: t.solutions, path: this.i18n.link('/solutions') },
            { name: s.name, path: this.i18n.link(path) },
          ]),
        ],
      });
    });
  }
}
