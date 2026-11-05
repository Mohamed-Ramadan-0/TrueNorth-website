import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { LangService } from '../../core/lang.service';

@Component({
  selector: 'tn-platform',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.css',
})
export class PlatformComponent {
  readonly i18n = inject(LangService);

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const lang = this.i18n.lang();
      const t = this.i18n.t();
      seo.set({
        title: t.platform.seoTitle,
        description: t.platform.seoDescription,
        path: '/platform',
        lang,
        schema: [breadcrumbs([{ name: t.solution.home, path: this.i18n.link('/') }, { name: t.platform.seoTitle, path: this.i18n.link('/platform') }])],
      });
    });
  }
}
