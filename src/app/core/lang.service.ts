import { Injectable, computed, inject, signal } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { COPY, Copy } from '../content/copy';

export type Lang = 'en' | 'ar';
export const LANGS: Lang[] = ['en', 'ar'];

/** English lives at the root, Arabic under /ar. */
export function langFromUrl(url: string): Lang {
  return /^\/ar(\/|$|\?|#)/.test(url) ? 'ar' : 'en';
}

export function localize(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return clean;
  return clean === '/' ? '/ar' : `/ar${clean}`;
}

/** Strips the language prefix: "/ar/platform" -> "/platform". */
export function basePath(url: string): string {
  const path = url.split(/[?#]/)[0];
  const stripped = path.replace(/^\/ar(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly router = inject(Router);
  private readonly url = signal(this.router.url);

  readonly lang = computed<Lang>(() => langFromUrl(this.url()));
  readonly dir = computed(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));
  readonly t = computed<Copy>(() => COPY[this.lang()]);
  /** Same page in the other language. */
  readonly otherLang = computed<Lang>(() => (this.lang() === 'ar' ? 'en' : 'ar'));
  readonly otherUrl = computed(() => localize(basePath(this.url()), this.otherLang()));

  constructor() {
    this.router.events
      // ResolveEnd fires before the new page is created, so pages read the right language.
      .pipe(filter((e): e is ResolveEnd | NavigationEnd => e instanceof ResolveEnd || e instanceof NavigationEnd))
      .subscribe((e) => this.url.set(e.urlAfterRedirects));
  }

  link(path: string): string {
    return localize(path, this.lang());
  }
}
