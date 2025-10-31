import { Hono } from 'jsr:@hono/hono';
import { serveStatic } from 'jsr:@hono/hono/deno';
const app = new Hono();

app.use('/*', serveStatic({ root: './public' }));

let users = [];

// GETリクエストに対する処理
app.get('/api', (c) => {
  return c.json({ message: 'GET', users });
});

app.post('/api', async (c) => {
  const body = await c.req.json();
  users.push(body);
  return c.json({ message: 'POST', users });
});

Deno.serve(app.fetch);
