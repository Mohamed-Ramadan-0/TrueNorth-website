// Renders the OG image and app icons from HTML with the preinstalled Playwright.
// Run with: node scripts/render-images.mjs  (needs network for Google Fonts)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // preinstalled globally; set NODE_PATH=$(npm root -g)
import { readFileSync, mkdirSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const mark = readFileSync(root + 'public/favicon.svg', 'utf8');
mkdirSync(root + 'public/og', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();

for (const size of [180, 192, 512]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<style>html,body{margin:0}svg{width:${size}px;height:${size}px;display:block}</style>${mark.replace('rx="7"', 'rx="0"')}`);
  await page.screenshot({ path: `${root}public/icon-${size}.png` });
}

await page.setViewportSize({ width: 1200, height: 630 });
const ticks = Array.from({ length: 120 }, (_, i) => {
  const a = (i * 3 * Math.PI) / 180, major = i % 10 === 0, r2 = major ? 180 : 188;
  return `<line x1="${Math.sin(a) * 196}" y1="${-Math.cos(a) * 196}" x2="${Math.sin(a) * r2}" y2="${-Math.cos(a) * r2}" stroke="rgba(241,243,239,${major ? .8 : .35})" stroke-width="${major ? 1.6 : 1}"/>`;
}).join('');
await page.setContent(`<!doctype html><html dir="rtl"><head>
<link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;600&family=IBM+Plex+Sans+Arabic:wght@400&display=block" rel="stylesheet">
<style>body{margin:0;width:1200px;height:630px;background:#0E1A2B;color:#F1F3EF;font-family:'Readex Pro';display:grid;grid-template-columns:1fr 470px;align-items:center;overflow:hidden}
.c{padding:0 80px 0 20px}h1{font-size:64px;line-height:1.25;font-weight:600;margin:0 0 28px}p{font:400 26px/1.6 'IBM Plex Sans Arabic';color:rgba(241,243,239,.75);margin:0}
.b{direction:ltr;display:flex;gap:14px;align-items:center;font-size:30px;font-weight:600;margin-bottom:44px;justify-content:flex-end}.b svg{width:44px;height:44px}</style></head><body>
<div class="c"><div class="b">TrueNorth ${mark}</div><h1>فريق رقمي بيشتغل جوه بزنسك 24 ساعة</h1><p>AI agents بترد على عملائك وتأكد أوردراتك على واتساب</p></div>
<svg viewBox="-210 -210 420 420" width="470" height="470" style="margin-left:30px"><circle r="196" fill="none" stroke="rgba(241,243,239,.42)"/><circle r="150" fill="none" stroke="rgba(241,243,239,.12)"/>${ticks}
<path d="M0 -140 L13 0 L-13 0 Z" fill="#F26A1B"/><path d="M0 140 L-13 0 L13 0 Z" fill="rgba(241,243,239,.85)"/><circle r="5" fill="#0E1A2B" stroke="#F1F3EF" stroke-width="2"/></svg>
</body></html>`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${root}public/og/default.png` });
await browser.close();
console.log('images rendered');
