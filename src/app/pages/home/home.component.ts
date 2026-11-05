import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { LangService } from '../../core/lang.service';
import { SOLUTIONS } from '../../content/solutions';
import { postsFor } from '../../content/posts';
import { NeedleFieldComponent } from '../../shared/needle-field.component';
import { ChatDemoComponent } from '../../shared/chat-demo.component';
import { LeadFormComponent } from '../../shared/lead-form.component';

@Component({
  selector: 'tn-home',
  imports: [RouterLink, NeedleFieldComponent, ChatDemoComponent, LeadFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly i18n = inject(LangService);
  readonly copy = computed(() => this.i18n.t().home);
  readonly solutions = computed(() => SOLUTIONS[this.i18n.lang()]);
  readonly latest = computed(() => postsFor(this.i18n.lang()).slice(0, 3));

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const lang = this.i18n.lang();
      const t = this.i18n.t();
      seo.set({
        title: t.home.seoTitle,
        description: t.meta.siteDescription,
        path: '/',
        lang,
        schema: [
          {
            '@type': 'FAQPage',
            mainEntity: t.home.faq.map((f) => ({ '@type': 'Question', name: f.t, acceptedAnswer: { '@type': 'Answer', text: f.b } })),
          },
        ],
      });
    });
  }
}
