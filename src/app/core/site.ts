/**
 * Site-wide settings. The domain is not final yet: change `url` once it is,
 * add the domain to security.allowedHosts in angular.json, and rebuild.
 */
export const SITE = {
  url: 'https://truenorth.ai',
  name: 'TrueNorth',
  nameAr: 'ترو نورث',
  ogImage: '/og/default.png',
  email: 'hello@truenorth.ai',
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
