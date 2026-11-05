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
// A field of needles aligned on north around one orange reference, as in the site's hero.
const cols = 13, rows = 7, gap = 48, ref = { c: 9, r: 3 };
let needles = '';
for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
  if (r === ref.r && c === ref.c) continue;
  needles += `<path transform="translate(${c * gap + 24} ${r * gap + 24})" d="M0 -11 L2.2 0 L0 11 L-2.2 0 Z" fill="rgba(241,243,239,.34)"/>`;
}
const refSvg = `<g transform="translate(${ref.c * gap + 24} ${ref.r * gap + 24})"><circle r="17" fill="none" stroke="rgba(242,106,27,.55)"/><path d="M0 -13 L3.2 0 L-3.2 0 Z" fill="#F26A1B"/><path d="M0 13 L-3.2 0 L3.2 0 Z" fill="#F1F3EF"/></g>`;
const og = {
  en: { dir: 'ltr', title: 'AI agents that run the work.', sub: 'AI agent systems for business' },
  ar: { dir: 'rtl', title: 'فريق رقمي بيشتغل جوه بزنسك 24 ساعة.', sub: 'أنظمة AI agents للشركات' },
};
for (const [lang, o] of Object.entries(og)) {
  await page.setContent(`<!doctype html><html dir="${o.dir}"><head>
<link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@400&display=block" rel="stylesheet">
<style>body{margin:0;width:1200px;height:630px;background:#0E1A2B;color:#F1F3EF;font-family:'Readex Pro';position:relative;overflow:hidden}
svg.f{position:absolute;inset:0;width:1200px;height:630px;${o.dir === 'rtl' ? 'transform:scaleX(-1);' : ''}-webkit-mask-image:linear-gradient(to right,transparent 20%,#000 70%)}
.c{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
h1{font-size:${lang === 'ar' ? 60 : 70}px;line-height:${lang === 'ar' ? 1.3 : 1.08};font-weight:500;letter-spacing:${lang === 'ar' ? 0 : '-.025em'};margin:0;max-width:${lang === 'ar' ? 640 : 600}px}
p{font:400 26px/1.5 'IBM Plex Sans Arabic';color:rgba(241,243,239,.72);margin:18px 0 0}
.b{direction:ltr;display:flex;gap:14px;align-items:center;font-size:30px;font-weight:500;${o.dir === 'rtl' ? 'justify-content:flex-end;' : ''}}.b svg{width:44px;height:44px}</style></head><body>
<svg class="f" viewBox="0 0 624 336" preserveAspectRatio="xMidYMid slice">${needles}${refSvg}</svg>
<div class="c"><div class="b">${mark} TrueNorth</div><div><h1>${o.title}</h1><p>${o.sub}</p></div></div>
</body></html>`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${root}public/og/${lang}.png` });
}
await browser.close();
console.log('images rendered');
