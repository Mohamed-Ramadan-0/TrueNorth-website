/**
 * Site-wide settings. The domain is not final yet: change SITE_URL once it is,
 * and run `npm run content` so the sitemap and robots.txt pick it up.
 */
export const SITE = {
  url: 'https://truenorth.ai',
  name: 'TrueNorth',
  nameAr: 'ترو نورث',
  tagline: 'فريق رقمي بيشتغل جوه بزنسك 24 ساعة',
  description:
    'TrueNorth بتبني AI agents بترد على عملائك على واتساب، وتأكد أوردراتك، وتحوّل لفريقك اللي محتاج إنسان. أوردرات وهمية أقل، ورد في ثواني.',
  locale: 'ar_EG',
  ogImage: '/og/default.png',
  email: 'hello@truenorth.ai',
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
