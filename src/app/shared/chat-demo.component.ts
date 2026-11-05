import { ChangeDetectionStrategy, Component, OnDestroy, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LangService } from '../core/lang.service';

type From = 'agent' | 'customer';
interface Msg { from: From; text: string; buttons?: string[]; time: string }
interface Scenario { id: string; tone: string; label: string; customer: string; agent: string; buttons?: string[]; status: string; note: string }

@Component({
  selector: 'tn-chat-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat-demo.component.html',
  styleUrl: './chat-demo.component.css',
})
export class ChatDemoComponent implements OnDestroy {
  private readonly i18n = inject(LangService);
  readonly d = computed(() => this.i18n.t().demo);
  readonly scenarios = computed(() => this.d().scenarios as Scenario[]);
  private readonly first = computed<Msg>(() => ({ from: 'agent', text: this.d().orderMsg, buttons: this.d().orderButtons, time: '10:42' }));
  readonly replies = signal<Msg[]>([]);
  readonly messages = computed(() => [this.first(), ...this.replies()]);
  readonly typing = signal(false);
  readonly active = signal<Scenario | null>(null);
  readonly busy = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    // Start over when the language changes.
    effect(() => { this.i18n.lang(); this.reset(); });
  }

  play(s: Scenario): void {
    if (this.busy() || !this.browser) return;
    this.reset();
    this.busy.set(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = (ms: number) => (reduce ? 0 : ms);
    this.later(wait(450), () => this.replies.update((l) => [...l, { from: 'customer', text: s.customer, time: '10:43' }]));
    this.later(wait(900), () => this.typing.set(true));
    this.later(wait(2100), () => {
      this.typing.set(false);
      this.replies.update((l) => [...l, { from: 'agent', text: s.agent, buttons: s.buttons, time: '10:43' }]);
      this.active.set(s);
      this.busy.set(false);
    });
  }

  reset(): void {
    this.clear();
    this.replies.set([]);
    this.active.set(null);
    this.typing.set(false);
    this.busy.set(false);
  }

  ngOnDestroy(): void { this.clear(); }

  private later(ms: number, fn: () => void): void { this.timers.push(setTimeout(fn, ms)); }
  private clear(): void { this.timers.forEach(clearTimeout); this.timers = []; }
}
