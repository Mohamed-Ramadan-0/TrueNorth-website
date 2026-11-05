import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { LeadFormComponent } from '../../shared/lead-form.component';

@Component({
  selector: 'tn-book-demo',
  imports: [LeadFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero page-hero-tight">
      <div class="wrap split">
        <div>
          <h1 class="h1">احجز ديمو مجاني</h1>
          <p class="lede">20 دقيقة أونلاين. هنوريك الـ agent بيأكد أوردر ويرد على أسئلة عميل على واتساب، ونحسب معاك الوقت اللي فريقك هيوفره.</p>
          <ul class="checks">
            <li>متجر تجريبي فيه منتجات شبه منتجاتك</li>
            <li>نشوف مع بعض فين الوقت بيضيع في دورة الأوردر عندك</li>
            <li>تعرف التركيب هياخد قد إيه وهيتكلف كام</li>
          </ul>
        </div>
        <div class="form-card form-card-light"><tn-lead-form source="book-demo" /></div>
      </div>
    </section>
  `,
})
export class BookDemoComponent {
  constructor() {
    inject(SeoService).set({
      title: 'احجز ديمو مجاني',
      description: 'شوف agent تأكيد الأوردرات شغال على واتساب في ديمو 20 دقيقة، على متجر تجريبي فيه منتجات شبه منتجاتك.',
      path: '/book-demo',
      schema: [breadcrumbs([{ name: 'الرئيسية', path: '/' }, { name: 'احجز ديمو', path: '/book-demo' }])],
    });
  }
}
