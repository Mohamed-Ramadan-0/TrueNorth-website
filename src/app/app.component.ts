import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MarkComponent } from './shared/mark.component';
import { LangService } from './core/lang.service';
import { SITE } from './core/site';
import { SOLUTIONS } from './content/solutions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = i18n.t();
    <a class="skip" href="#main">{{ t.nav.skip }}</a>
    <header class="site-header">
      <div class="wrap bar">
        <a [routerLink]="i18n.link('/')" class="brand" [attr.aria-label]="t.nav.home">
          <tn-mark [size]="30" />
          <span class="brand-name">TrueNorth</span>
        </a>
        <button class="menu-toggle" type="button" [attr.aria-expanded]="menuOpen()" aria-controls="site-nav" (click)="menuOpen.set(!menuOpen())">
          {{ menuOpen() ? t.nav.close : t.nav.menu }}
        </button>
        <nav id="site-nav" class="nav" [class.open]="menuOpen()" [attr.aria-label]="t.nav.mainNav">
          <a [routerLink]="i18n.link('/solutions')" routerLinkActive="active">{{ t.nav.solutions }}</a>
          <a [routerLink]="i18n.link('/platform')" routerLinkActive="active">{{ t.nav.platform }}</a>
          <a [routerLink]="i18n.link('/company')" routerLinkActive="active">{{ t.nav.company }}</a>
          <a [routerLink]="i18n.link('/blog')" routerLinkActive="active">{{ t.nav.insights }}</a>
          <a [href]="i18n.otherUrl()" class="lang-switch" [attr.hreflang]="i18n.otherLang()" [attr.lang]="i18n.otherLang()" [attr.aria-label]="t.nav.switchAria">{{ t.nav.switchLabel }}</a>
          <a [routerLink]="i18n.link('/contact')" class="btn btn-signal btn-sm">{{ t.nav.contact }}</a>
        </nav>
      </div>
    </header>

    <main id="main"><router-outlet /></main>

    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <a [routerLink]="i18n.link('/')" class="brand"><tn-mark [size]="26" /><span class="brand-name">TrueNorth</span></a>
          <p class="footer-line">{{ t.footer.tagline }}</p>
          <a class="footer-mail" [href]="'mailto:' + email">{{ email }}</a>
        </div>
        <nav class="footer-cols" [attr.aria-label]="t.footer.links">
          <div>
            <h2>{{ t.footer.solutions }}</h2>
            @for (s of solutions(); track s.slug) {
              <a [routerLink]="i18n.link('/solutions/' + s.slug)">{{ s.name }}</a>
            }
          </div>
          <div>
            <h2>{{ t.footer.company }}</h2>
            <a [routerLink]="i18n.link('/platform')">{{ t.nav.platform }}</a>
            <a [routerLink]="i18n.link('/company')">{{ t.nav.company }}</a>
            <a [routerLink]="i18n.link('/blog')">{{ t.nav.insights }}</a>
            <a [routerLink]="i18n.link('/contact')">{{ t.nav.contact }}</a>
          </div>
        </nav>
      </div>
      <div class="wrap footer-base">© {{ year }} {{ t.footer.rights }}</div>
    </footer>
  `,
})
export class AppComponent {
  readonly i18n = inject(LangService);
  readonly menuOpen = signal(false);
  readonly email = SITE.email;
  readonly year = new Date().getFullYear();
  readonly solutions = () => SOLUTIONS[this.i18n.lang()];

  constructor() {
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));
  }
}
