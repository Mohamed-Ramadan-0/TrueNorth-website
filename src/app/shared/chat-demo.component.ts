import { ChangeDetectionStrategy, Component, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type From = 'agent' | 'customer';
interface Msg { from: From; text: string; buttons?: string[]; time: string }
interface Scenario {
  id: string;
  label: string;
  customer: string;
  agent: string;
  agentButtons?: string[];
  status: string;
  tone: 'ok' | 'wait' | 'stop' | 'human';
  note: string;
}

const ORDER_MSG =
  'أهلًا منى 👋 ده تأكيد أوردرك رقم 1042 من متجر نوارة:\n' +
  'عباية كريب، مقاس 54، كحلي × 1\n' +
  'الإجمالي: 450 ج.م شامل الشحن\n' +
  'العنوان: مدينة نصر، شارع عباس العقاد، عمارة 12';

const SCENARIOS: Scenario[] = [
  {
    id: 'confirm', label: 'تأكيد', customer: 'تأكيد الأوردر',
    agent: 'تمام يا منى، أوردرك اتأكد ✅ هيوصلك خلال 2 لـ 4 أيام، وهبعتلك رقم الشحنة أول ما تخرج.',
    status: 'مؤكد، جاهز للشحن', tone: 'ok', note: 'الحالة اتحدثت في المتجر تلقائيًا.',
  },
  {
    id: 'address', label: 'تغيير العنوان', customer: 'ممكن تبعتوه على شغلي؟ شارع مكرم عبيد عمارة 5',
    agent: 'أكيد. الأوردر لسه متشحنش، فعدّلت العنوان لـ: مدينة نصر، شارع مكرم عبيد، عمارة 5. أأكد الأوردر بالعنوان الجديد؟',
    agentButtons: ['تأكيد الأوردر', 'تعديل'],
    status: 'العنوان اتعدّل، مستني تأكيد', tone: 'wait', note: 'التعديل بيتسمح بس قبل الشحن.',
  },
  {
    id: 'question', label: 'سؤال عن المقاس', customer: 'مقاس 54 طوله قد إيه؟ أنا طولي 165',
    agent: 'مقاس 54 طوله 137 سم، ومناسب للطول من 160 لـ 167 سم حسب جدول مقاسات المتجر. تحبي أأكد الأوردر؟',
    agentButtons: ['تأكيد الأوردر', 'تغيير المقاس'],
    status: 'مستني تأكيد', tone: 'wait', note: 'الإجابة من بيانات المتجر بس، مش تأليف.',
  },
  {
    id: 'cancel', label: 'إلغاء', customer: 'لا خلاص مش عايزاه',
    agent: 'ولا يهمك يا منى، ألغيت الأوردر 1042. لو حبيتي تطلبي تاني إحنا موجودين.',
    status: 'ملغي، المخزون رجع', tone: 'stop', note: 'الأوردر مش هيتشحن، ومفيش شحن ضايع.',
  },
  {
    id: 'complaint', label: 'شكوى', customer: 'آخر مرة الأوردر اتأخر أسبوع ومحدش رد عليا!!',
    agent: 'حقك علينا يا منى. حوّلت كلامك لفريق خدمة العملاء ومعاهم تفاصيل أوردراتك، وهيتواصلوا معاكي النهارده.',
    status: 'محوّل لموظف، أولوية عالية', tone: 'human', note: 'الـ agent سكت، والموظف استلم ملخص المحادثة.',
  },
];

@Component({
  selector: 'tn-chat-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat-demo.component.html',
  styleUrl: './chat-demo.component.css',
})
export class ChatDemoComponent implements OnDestroy {
  readonly scenarios = SCENARIOS;
  readonly messages = signal<Msg[]>([{ from: 'agent', text: ORDER_MSG, buttons: ['تأكيد الأوردر', 'تعديل', 'إلغاء'], time: '10:42' }]);
  readonly typing = signal(false);
  readonly active = signal<Scenario | null>(null);
  readonly busy = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  play(s: Scenario): void {
    if (this.busy() || !this.browser) return;
    this.reset();
    this.busy.set(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = (ms: number) => (reduce ? 0 : ms);
    this.later(wait(450), () => this.push({ from: 'customer', text: s.customer, time: '10:43' }));
    this.later(wait(900), () => this.typing.set(true));
    this.later(wait(2100), () => {
      this.typing.set(false);
      this.push({ from: 'agent', text: s.agent, buttons: s.agentButtons, time: '10:43' });
      this.active.set(s);
      this.busy.set(false);
    });
  }

  reset(): void {
    this.clear();
    this.messages.set([this.messages()[0]]);
    this.active.set(null);
    this.typing.set(false);
    this.busy.set(false);
  }

  ngOnDestroy(): void { this.clear(); }

  private push(m: Msg): void { this.messages.update((list) => [...list, m]); }
  private later(ms: number, fn: () => void): void { this.timers.push(setTimeout(fn, ms)); }
  private clear(): void { this.timers.forEach(clearTimeout); this.timers = []; }
}
