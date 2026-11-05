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
    store: str(b.store, 120),
    platform: str(b.platform, 40),
    monthlyOrders: str(b.monthlyOrders, 40),
    whatsapp: str(b.whatsapp, 20),
    source: str(b.source, 40),
    at: new Date().toISOString(),
  };
  if (!lead.name || !lead.store || !lead.platform || !lead.monthlyOrders || !/^\+?[0-9\s-]{9,18}$/.test(lead.whatsapp)) {
    res.status(400).json({ error: 'missing_or_invalid_fields' });
    return;
  }
  try {
    await mkdir(dirname(leadsFile), { recursive: true });
    await appendFile(leadsFile, JSON.stringify(lead) + '\n');
    const hook = process.env['LEAD_WEBHOOK_URL'];
    if (hook) {
      fetch(hook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(lead) }).catch((e) =>
        console.error('lead webhook failed', e),
      );
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
