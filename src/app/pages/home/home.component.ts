import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site';
import { HOME_FAQ, faqSchema } from '../../content/faq';
import { POSTS } from '../../content/posts.generated';
import { DialComponent } from '../../shared/dial.component';
import { ChatDemoComponent } from '../../shared/chat-demo.component';
import { LeadFormComponent } from '../../shared/lead-form.component';

@Component({
  selector: 'tn-home',
  imports: [RouterLink, DialComponent, ChatDemoComponent, LeadFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly faq = HOME_FAQ;
  readonly latest = POSTS.slice(0, 3);

  readonly pains = [
    { title: 'أوردرات بتتشحن وترجع', body: 'عميل مكنش جاد، أو عنوان ناقص، أو سؤال محدش رد عليه. وانت اللي بتدفع الشحن رايح وجاي.' },
    { title: 'عملاء مستنيين رد', body: 'الرسايل بتتراكم بالليل وفي الزحمة، والعميل اللي مستني ساعات بيشتري من مكان تاني.' },
    { title: 'فريق غرقان في نفس الشغل', body: 'تأكيد، ورد على نفس الأسئلة، ومتابعة شحنات. ساعات كل يوم في شغل ينفع يخلص لوحده.' },
  ];

  readonly domains = [
    { name: 'المتاجر الإلكترونية', state: 'متاح', open: true, link: '/solutions/ecommerce',
      body: 'تأكيد الأوردرات والرد على العملاء على واتساب. وبعدها: متابعة الشحن والمرتجعات، والاحتفاظ بالعملاء.' },
    { name: 'المبيعات', state: 'قريبًا', open: false, body: 'متابعة العملاء المحتملين وتأهيلهم، وحجز المواعيد، والتذكير.' },
    { name: 'العقارات', state: 'قريبًا', open: false, body: 'الرد على استفسارات الوحدات، وتأهيل المشتري، وحجز المعاينات.' },
    { name: 'حلول مخصصة', state: 'عند الطلب', open: false, body: 'شغل متكرر مش في القايمة؟ بندرس الأتمتة عندك بسعر ثابت، ونقولك ينفع يتعمل إيه.' },
  ];

  readonly steps = [
    { title: 'ندرس بزنسك', body: 'نقعد معاك نفهم الأوردر بيمشي إزاي من أول الطلب لحد الاستلام، وفين الوقت بيضيع.' },
    { title: 'نبني ونربط الـ agent', body: 'نوصله برقم واتساب متجرك وبيانات منتجاتك وسياساتك، ونحط حدوده: يعمل إيه، ويحوّل إمتى.' },
    { title: 'نقيس ونطوّر', body: 'نقيس الأرقام قبل وبعد: نسبة التأكيد، والمرتجع، ووقت الرد، وساعات فريقك. ونطور على أساسها.' },
  ];

  constructor() {
    inject(SeoService).set({
      title: `TrueNorth | ${SITE.tagline}`,
      description: SITE.description,
      path: '/',
      schema: [faqSchema(HOME_FAQ)],
    });
  }
}
