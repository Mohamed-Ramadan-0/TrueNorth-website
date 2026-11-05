import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const leadsFile = resolve(process.env['LEADS_FILE'] || 'data/leads.jsonl');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

/**
 * Demo requests from the site's forms. Stored as JSON lines, and forwarded to
 * LEAD_WEBHOOK_URL (Slack, Zapier, the agent backend, ...) when it is set.
 */
app.post('/api/leads', express.json({ limit: '10kb' }), async (req, res) => {
  const b = req.body ?? {};
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  if (str(b.website, 200)) {
    res.status(204).end(); // honeypot filled: a bot, drop silently
    return;
  }
  const lead = {
    name: str(b.name, 80),
    company: str(b.company, 120),
    email: str(b.email, 160),
    whatsapp: str(b.whatsapp, 20),
    industry: str(b.industry, 60),
    need: str(b.need, 1000),
    source: str(b.source, 60),
    lang: b.lang === 'ar' ? 'ar' : 'en',
    at: new Date().toISOString(),
  };
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email);
  const phoneOk = !lead.whatsapp || /^\+?[0-9\s-]{9,18}$/.test(lead.whatsapp);
  if (!lead.name || !lead.company || !lead.industry || !emailOk || !phoneOk) {
    res.status(400).json({ error: 'missing_or_invalid_fields' });
    return;
  }
  try {
    // On Vercel the filesystem is read-only and wiped between requests, so leads
    // go to LEAD_WEBHOOK_URL (and the function logs). Elsewhere they are also kept on disk.
    if (!process.env['VERCEL']) {
      await mkdir(dirname(leadsFile), { recursive: true });
      await appendFile(leadsFile, JSON.stringify(lead) + '\n');
    }
    console.log('lead', JSON.stringify(lead));
    const hook = process.env['LEAD_WEBHOOK_URL'];
    if (hook) {
      // Awaited: a serverless function may be frozen as soon as the response is sent.
      const r = await fetch(hook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(lead) });
      if (!r.ok) throw new Error(`lead webhook returned ${r.status}`);
    }
    res.status(201).json({ ok: true });
  } catch (e) {
    console.error('saving lead failed', e);
    res.status(500).json({ error: 'save_failed' });
  }
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
    setHeaders: (res, path) => {
      // Hashed bundles can be cached forever; HTML, sitemap and robots must stay fresh.
      if (/\.(html|xml|txt|webmanifest)$/.test(path)) res.setHeader('Cache-Control', 'public, max-age=300');
    },
  }),
);

app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => console.log(`TrueNorth site on http://localhost:${port}`));
}

export const reqHandler = createNodeRequestHandler(app);
