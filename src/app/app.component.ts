import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MarkComponent } from './shared/mark.component';
import { SITE } from './core/site';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip" href="#main">انتقل للمحتوى</a>
    <header class="site-header">
      <div class="wrap bar">
        <a routerLink="/" class="brand" aria-label="TrueNorth، الصفحة الرئيسية">
          <tn-mark [size]="30" />
          <span class="brand-name">TrueNorth</span>
        </a>
        <button class="menu-toggle" type="button" [attr.aria-expanded]="menuOpen()" aria-controls="site-nav" (click)="menuOpen.set(!menuOpen())">
          {{ menuOpen() ? 'اقفل' : 'القايمة' }}
        </button>
        <nav id="site-nav" class="nav" [class.open]="menuOpen()" aria-label="الرئيسية">
          <a routerLink="/solutions/ecommerce" routerLinkActive="active">حلول المتاجر</a>
          <a routerLink="/" fragment="how">إزاي بنشتغل</a>
          <a routerLink="/blog" routerLinkActive="active">المدونة</a>
          <a routerLink="/book-demo" class="btn btn-signal btn-sm">احجز ديمو مجاني</a>
        </nav>
      </div>
    </header>

    <main id="main"><router-outlet /></main>

    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div>
          <a routerLink="/" class="brand"><tn-mark [size]="26" /><span class="brand-name">TrueNorth</span></a>
          <p class="footer-line">{{ tagline }}</p>
        </div>
        <nav aria-label="روابط الموقع" class="footer-links">
          <a routerLink="/solutions/ecommerce">حلول المتاجر</a>
          <a routerLink="/blog">المدونة</a>
          <a routerLink="/book-demo">احجز ديمو</a>
          <a [href]="'mailto:' + email">{{ email }}</a>
        </nav>
      </div>
      <div class="wrap footer-base">© {{ year }} TrueNorth. حلول AI agents للشركات.</div>
    </footer>
  `,
})
export class AppComponent {
  readonly menuOpen = signal(false);
  readonly tagline = SITE.tagline;
  readonly email = SITE.email;
  readonly year = new Date().getFullYear();

  constructor() {
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));
  }
}
