# موقع TrueNorth

موقع الشركة v1: عربي أولًا، Angular 19 مع SSR و prerender. هدفه واحد: صاحب المتجر يحجز ديمو.

## الصفحات

| المسار | الصفحة | الريندر |
|---|---|---|
| `/` | الرئيسية: Hero، المشكلة، المجالات، ديمو واتساب تفاعلي، إزاي بنشتغل، التكاملات، الأسئلة، المدونة، فورم | Prerender |
| `/solutions/ecommerce` | حل المتاجر: خطوات الـ agent الستة، الديمو، الأرقام اللي بنقيسها، الـ agents الجاية، السعر "تواصل معانا" | Prerender |
| `/book-demo` | فورم حجز الديمو | Prerender |
| `/blog` و `/blog/:slug` | المدونة | Prerender (كل مقالة صفحة HTML جاهزة) |
| أي مسار تاني | صفحة 404 بـ status 404 حقيقي و `noindex` | SSR |

ملتزمين بقاعدة الخطة: مفيش آراء عملاء ولا أرقام نتايج ولا لوجوهات. الديمو التفاعلي هو الدليل لحد ما تيجي دراسات الحالة.

## التشغيل

```bash
npm install
```

```bash
npm start            # تطوير على http://localhost:4200
```

```bash
npm run build        # بيبني المحتوى، وبعدين الـ browser والـ server، وبيعمل prerender
```

```bash
npm run serve:ssr    # سيرفر Express على http://localhost:4000 (PORT لو عايز تغيره)
```

## المدونة

كل مقالة ملف Markdown في `content/blog/`، واسم الملف هو الـ slug:

```markdown
---
title: "عنوان المقالة"
description: "جملة أو اتنين، بتظهر في جوجل وفي الكروت"
date: 2026-11-05
author: "فريق TrueNorth"
tags: ["واتساب", "تأكيد الأوردرات"]
# updated: 2026-11-20   اختياري
# draft: true           متتنشرش
---

نص المقالة...
```

`npm run content` (بيشتغل لوحده قبل `start` و `build`) بيحوّل المقالات لـ `src/app/content/posts.generated.ts`، ويكتب `sitemap.xml` و `rss.xml` و `robots.txt` في `public/`. المقالة الجديدة بتتعملها prerender لوحدها.

## الـ SEO

- **SSR و Prerender:** كل صفحة بتطلع HTML كامل للزاحف، وفيه `lang="ar" dir="rtl"`.
- **لكل صفحة** (`src/app/core/seo.service.ts`): title و description و canonical و robots، و Open Graph و Twitter card، و JSON-LD.
- **Structured data:** `Organization` و `WebSite` في كل صفحة، و `FAQPage` في الرئيسية، و `Service` في صفحة المتاجر، و `Blog` و `BlogPosting` في المدونة، و `BreadcrumbList`.
- **Sitemap و RSS و robots.txt** بيتولدوا من المحتوى، و `/api/` ممنوعة من الأرشفة.
- **صورة المشاركة** `public/og/default.png` والأيقونات بتترسم من `scripts/render-images.mjs`:

```bash
NODE_PATH=$(npm root -g) node scripts/render-images.mjs
```

## فورم الديمو

الفورم بيبعت على `POST /api/leads` في `src/server.ts`. السيرفر بيتأكد من الحقول، وبيرمي البوتات بحقل honeypot، وبيحفظ كل طلب سطر JSON في `data/leads.jsonl` (أو المسار اللي في `LEADS_FILE`). لو حطيت `LEAD_WEBHOOK_URL` (Slack أو Zapier أو backend الـ agent) بيبعتله الطلب كمان.

## قبل النشر

- [ ] **الدومين:** غيّر `url` في `src/app/core/site.ts`، وضيف الدومين في `security.allowedHosts` في `angular.json`. الطلبات من أي host مش في القايمة بتترفض.
- [ ] **الإيميل:** `email` في `site.ts` (حاليًا `hello@truenorth.ai`).
- [ ] **السوق الأول:** الديمو والمقالات فيها مثال بالجنيه (`450 ج.م`). لو السعودية، غيّر العملة في `src/app/shared/chat-demo.component.ts` وفي `og:locale` (`ar_SA`).
- [ ] **المنصة الأولى:** قسم التكاملات مكتوب فيه "بنربط المنصة اللي شغال عليها". لما الربط يشتغل فعلًا، اكتب اسمها.
- [ ] **الاستضافة:** أي مكان بيشغل Node 18+، مثلًا `node dist/truenorth-website/server/server.mjs`. خلي `data/` على volume دايم.
- [ ] **على Vercel:** اعمل Import للـ repo ده (`TrueNorth-website`)، وسيب الـ Framework Preset على Angular. الصفحات الجاهزة بتتقدم static، والـ SSR والـ `/api/leads` بيشتغلوا من `reqHandler` اللي في `src/server.ts`. ولأن Vercel مبيحفظش ملفات، حط `LEAD_WEBHOOK_URL` في Environment Variables، وإلا الطلبات هتفضل في الـ Function Logs بس. الدومين بتاعك ضيفه في `allowedHosts` (فيها `*.vercel.app` خلاص).
- [ ] سجّل الموقع في Google Search Console وابعت `sitemap.xml`.

## الهوية البصرية

الألوان والخطوط معرفين كـ tokens في أول `src/styles.css`:

- **الألوان:** كحلي ملاحي `#0E1A2B`، وورق خرايط `#F1F3EF`، وبرتقالي إشارة `#F26A1B` بيتحط على حاجة واحدة بس في كل جزء: إبرة الشمال، والزرار الأساسي.
- **الخطوط:** Readex Pro للعناوين، و IBM Plex Sans Arabic للنص.
- **الحركة:** حاجة واحدة بس، وهي إن إبرة البوصلة في الـ Hero بتتهز وتستقر على الشمال. ودي بتقف لو المستخدم مفعّل `prefers-reduced-motion`.
