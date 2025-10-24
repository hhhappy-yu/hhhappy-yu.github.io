import { Hono } from 'jsr:@hono/hono';
import { serveStatic } from 'jsr:@hono/hono/deno';

const app = new Hono();

app.use('/*', serveStatic({ root: './public' }));

app.get('/api', (c) => {
  console.log('GET /api');
  return c.json({ message: 'レスポンス' });
});

Deno.serve(app.fetch);
