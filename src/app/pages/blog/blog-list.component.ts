import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { SITE, absoluteUrl } from '../../core/site';
import { POSTS } from '../../content/posts.generated';
import { ArabicDatePipe } from './arabic-date.pipe';

@Component({
  selector: 'tn-blog-list',
  imports: [RouterLink, ArabicDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero page-hero-tight">
      <div class="wrap">
        <h1 class="h1">المدونة</h1>
        <p class="lede">كلام عملي لأصحاب المتاجر: إزاي تقلل المرتجعات، وترد أسرع، وتوفر وقت فريقك.</p>
      </div>
    </section>
    <section class="section section-flush">
      <div class="wrap">
        @if (posts.length) {
          <ul class="blog-index">
            @for (p of posts; track p.slug) {
              <li>
                <article>
                  <time [attr.datetime]="p.date">{{ p.date | arDate }}</time>
                  <div>
                    <h2><a [routerLink]="['/blog', p.slug]">{{ p.title }}</a></h2>
                    <p>{{ p.description }}</p>
                    <span class="meta">{{ p.readingMinutes }} دقايق قراية</span>
                  </div>
                </article>
              </li>
            }
          </ul>
        } @else {
          <p class="lede">أول مقالة جاية قريب.</p>
        }
      </div>
    </section>
  `,
})
export class BlogListComponent {
  readonly posts = POSTS;

  constructor() {
    inject(SeoService).set({
      title: 'المدونة',
      description: 'مقالات عملية لأصحاب المتاجر الإلكترونية عن تأكيد الأوردرات، والدفع عند الاستلام، وخدمة العملاء على واتساب، والـ AI agents.',
      path: '/blog',
      schema: [
        {
          '@type': 'Blog',
          '@id': absoluteUrl('/blog#blog'),
          name: `مدونة ${SITE.name}`,
          url: absoluteUrl('/blog'),
          inLanguage: 'ar',
          publisher: { '@id': absoluteUrl('/#org') },
          blogPost: POSTS.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.date,
          })),
        },
        breadcrumbs([{ name: 'الرئيسية', path: '/' }, { name: 'المدونة', path: '/blog' }]),
      ],
    });
  }
}
