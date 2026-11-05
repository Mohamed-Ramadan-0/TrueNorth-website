# موقع TrueNorth

موقع الشركة: TrueNorth شركة أنظمة AI agents. الموقع بلغتين، الإنجليزي على `/` والعربي على `/ar`، ومعمول بـ Angular 19 مع SSR و prerender.

## الصفحات (بالإنجليزي، والعربي نفس المسار بعد `/ar`)

| المسار | الصفحة |
|---|---|
| `/` | الرئيسية: Hero، الـ agents بتعمل إيه، الحلول حسب المجال، ديمو تفاعلي، مبادئ البناء، الأساس المشترك، طريقة الشغل، الرؤية، المدونة، الأسئلة، الفورم |
| `/solutions` | كل الحلول |
| `/solutions/ecommerce` | حل المتاجر (متاح): خطوات الـ agent، والديمو، والأرقام، والـ agents الجاية |
| `/solutions/sales` · `/solutions/real-estate` | المجالات الجاية، وفيها فورم قائمة الانتظار |
| `/solutions/custom` | دراسة أتمتة بسعر ثابت |
| `/platform` | الـ agent بيشتغل إزاي: المسار، والأمان، والتشغيل، والقنوات |
| `/company` | الرسالة، والرؤية، ومعنى الاسم، وإيه اللي بيفرقنا |
| `/contact` | الفورم |
| `/blog` · `/blog/:slug` | المدونة |

أي مسار مش موجود بيرجع صفحة 404 حقيقية. و `/book-demo` القديم بيتحول بـ 301 لـ `/contact`.

ملتزمين بقاعدة خطة الشركة: مفيش آراء عملاء ولا أرقام نتايج ولا لوجوهات. الديمو الحي هو الدليل لحد ما يبقى فيه دراسات حالة.

## الكلام والترجمة

- **نصوص الموقع:** كلها في `src/app/content/copy.ts`، بالإنجليزي والعربي. التايب بيضمن إن النسختين فيهم نفس المفاتيح.
- **صفحات الحلول:** في `src/app/content/solutions.ts`. ولما تضيف مجال جديد، صفحته بتطلع لوحدها في الموقع والـ sitemap.

## التشغيل

```bash
npm install
```

```bash
npm start            # تطوير على http://localhost:4200
```

```bash
npm run build        # المحتوى، وبعدين البيلد، و prerender لكل الصفحات باللغتين
```

```bash
npm run serve:ssr    # سيرفر Express على http://localhost:4000
```

## المدونة

المقالات ملفات Markdown في `content/blog/en/` و `content/blog/ar/`، واسم الملف هو الـ slug:

```markdown
---
title: "Article title"
description: "One or two sentences for Google and link previews"
key: guardrails        # نفس القيمة في الترجمة التانية، علشان hreflang يربطهم
date: 2026-11-05
author: "TrueNorth team"
tags: ["AI agents"]
# updated: 2026-11-20
# draft: true
---
```

`npm run content` (بيشتغل لوحده قبل `start` و `build`) بيحوّل المقالات لـ `src/app/content/posts.generated.ts`. وبيكتب في `public/` الـ `sitemap.xml` (بروابط hreflang)، و `rss.xml` (إنجليزي)، و `rss-ar.xml`، و `robots.txt`.

## الـ SEO

- **SSR و prerender:** كل صفحة باللغتين بتطلع HTML كامل، وفيها `lang` و `dir` الصح.
- **لكل صفحة:** title و description و canonical و robots و Open Graph (بالـ locale الصح) و Twitter card، و `hreflang` للإنجليزي والعربي و `x-default`.
- **JSON-LD:** `Organization` و `WebSite` في كل صفحة، و `FAQPage` في الرئيسية، و `Service` لكل حل، و `ItemList` و `AboutPage` و `ContactPage` و `Blog` و `BlogPosting` و `BreadcrumbList`.
- **صور المشاركة:** `public/og/en.png` و `public/og/ar.png` والأيقونات بتترسم كده:

```bash
NODE_PATH=$(npm root -g) node scripts/render-images.mjs
```

## الفورم

بيبعت على `POST /api/leads` في `src/server.ts`. السيرفر بيتأكد من الحقول، وبيرمي البوتات بحقل honeypot، وبيحفظ الطلب في `data/leads.jsonl` (إلا على Vercel). ولو `LEAD_WEBHOOK_URL` متحط، بيبعتله الطلب.

## النشر

- **أي سيرفر Node 18+:** `node dist/truenorth-website/server/server.mjs`، وخلي `data/` على volume دايم.
- **Vercel:** اعمل Import للـ repo ده (مش `newpro`)، والـ Framework Preset يفضل Angular. وحط `LEAD_WEBHOOK_URL` في Environment Variables، لأن Vercel مبيحفظش ملفات.

## قبل النشر

- [ ] **الدومين:** غيّر `url` في `src/app/core/site.ts`، وضيفه في `security.allowedHosts` في `angular.json`.
- [ ] **الإيميل:** `email` في `site.ts` (حاليًا `hello@truenorth.ai`).
- [ ] **مثال الديمو:** الإجمالي في الديمو "450" من غير عملة، علشان الموقع لكل الأسواق.
- [ ] سجّل الموقع في Google Search Console وابعت `sitemap.xml`.

## الهوية البصرية

الـ tokens في أول `src/styles.css`:

- **الألوان:** كحلي ملاحي `#0E1A2B`، وورق خرايط `#F1F3EF`، وبرتقالي إشارة `#F26A1B`.
- **الخطوط:** Readex Pro للعناوين (عربي وإنجليزي)، و IBM Plex Sans Arabic للنص.
- **الـ Hero:** مأخوذ من فكرة البوسترات (Calibrated Bearing). حقل إبر بوصلة كل إبرة فيه مايلة لوحدها، وبتتظبط على الشمال في موجة بتبدأ من مرجع برتقالي واحد مبيتحركش، يعني agents كتير متوجهة لهدف واحد. دي الحركة الوحيدة في الموقع، وبتقف مع `prefers-reduced-motion`.
