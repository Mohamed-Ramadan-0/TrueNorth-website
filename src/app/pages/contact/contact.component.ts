import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { LangService } from '../../core/lang.service';
import { SITE, absoluteUrl } from '../../core/site';
import { LeadFormComponent } from '../../shared/lead-form.component';

@Component({
  selector: 'tn-contact',
  imports: [LeadFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t().contact;
    <section class="page-hero page-hero-tight">
      <div class="wrap split">
        <div>
          <h1 class="h1">{{ t.title }}</h1>
          <p class="lede">{{ t.lede }}</p>
          <ul class="checks">
            @for (p of t.points; track p) { <li>{{ p }}</li> }
          </ul>
          <p class="contact-mail">{{ t.emailLabel }} <a [href]="'mailto:' + email">{{ email }}</a></p>
        </div>
        <div class="form-card form-card-light"><tn-lead-form source="contact" /></div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  readonly i18n = inject(LangService);
  readonly email = SITE.email;

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const lang = this.i18n.lang();
      const t = this.i18n.t();
      seo.set({
        title: t.contact.seoTitle,
        description: t.contact.seoDescription,
        path: '/contact',
        lang,
        schema: [
          { '@type': 'ContactPage', name: t.contact.title, url: absoluteUrl(this.i18n.link('/contact')) },
          breadcrumbs([{ name: t.solution.home, path: this.i18n.link('/') }, { name: t.contact.title, path: this.i18n.link('/contact') }]),
        ],
      });
    });
  }
}
