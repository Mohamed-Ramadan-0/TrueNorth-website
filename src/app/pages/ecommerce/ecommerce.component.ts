import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { absoluteUrl } from '../../core/site';
import { ChatDemoComponent } from '../../shared/chat-demo.component';

@Component({
  selector: 'tn-ecommerce',
  imports: [RouterLink, ChatDemoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ecommerce.component.html',
})
export class EcommerceComponent {
  readonly steps = [
    { t: 'يستقبل الأوردر أول ما يتعمل', b: 'من متجرك مباشرة، من غير ما حد ينقله بإيده.' },
    { t: 'يبعت التأكيد على واتساب', b: 'تفاصيل الأوردر والإجمالي والعنوان، وأزرار: تأكيد، تعديل، إلغاء.' },
    { t: 'يرد على أسئلة العميل', b: 'المقاس، وميعاد التوصيل، والدفع. من بيانات متجرك بس.' },
    { t: 'يحدّث حالة الأوردر في المتجر', b: 'مؤكد، أو ملغي، أو محتاج مراجعة. فريق الشحن يشوف الحالة على طول.' },
    { t: 'يفكّر العميل اللي مردش', b: 'تذكير بعد وقت تحدده، ولو مفيش رد الأوردر بيروح لموظف.' },
    { t: 'يحوّل لإنسان لما يلزم', b: 'أي شكوى، أو طلب استرجاع فلوس، أو سؤال مش لاقي إجابته. ومعاه ملخص المحادثة.' },
  ];

  readonly metrics = [
    { t: 'نسبة الأوردرات المؤكدة', b: 'كام أوردر من كل 100 اتأكد قبل الشحن.' },
    { t: 'نسبة المرتجع والرفض عند الاستلام', b: 'الرقم اللي بيكلفك شحن رايح وجاي.' },
    { t: 'متوسط وقت الرد', b: 'من رسالة العميل لحد أول رد.' },
    { t: 'ساعات فريقك اللي اتوفرت', b: 'الوقت اللي كان بيروح في التأكيد والرد المتكرر.' },
  ];

  readonly next = [
    { t: 'متابعة الشحن والمرتجعات', b: 'يرد على "أوردري فين؟" ويتابع المرتجع لحد ما يخلص.' },
    { t: 'الاحتفاظ بالعملاء', b: 'يفكّر العميل يرجع يشتري في الوقت المناسب.' },
    { t: 'المحتوى', b: 'وصف منتجات وبوستات من كتالوجك.' },
    { t: 'الإعلانات', b: 'يتابع أداء الإعلانات ويقترح فين الفلوس تروح.' },
  ];

  constructor() {
    const title = 'agent تأكيد الأوردرات على واتساب للمتاجر الإلكترونية';
    const description =
      'قلل المرتجعات والأوردرات الوهمية في الدفع عند الاستلام. agent بيأكد كل أوردر مع العميل على واتساب، ويرد على أسئلته، ويحدّث الحالة في متجرك.';
    inject(SeoService).set({
      title,
      description,
      path: '/solutions/ecommerce',
      schema: [
        {
          '@type': 'Service',
          name: title,
          serviceType: 'AI agent لتأكيد الأوردرات وخدمة العملاء',
          description,
          provider: { '@id': absoluteUrl('/#org') },
          areaServed: ['SA', 'EG'],
          url: absoluteUrl('/solutions/ecommerce'),
        },
        breadcrumbs([
          { name: 'الرئيسية', path: '/' },
          { name: 'حلول المتاجر', path: '/solutions/ecommerce' },
        ]),
      ],
    });
  }
}
