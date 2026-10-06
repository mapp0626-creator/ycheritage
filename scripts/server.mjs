import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../site.config.mjs';

const project = fileURLToPath(new URL('../', import.meta.url));
const development = process.argv.includes('--dev');
const roots = (development ? [config.sourceDirectory, config.publicDirectory] : [config.outputDirectory]).map(p => path.resolve(project, p));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const host = process.env.HOST || config.host;
const port = Number(process.env.PORT || config.port);
if (!development) {
  try { await stat(path.join(roots[0], 'index.html')); }
  catch { console.error('Run npm run build before npm start.'); process.exit(1); }
}
const server = http.createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
  let relative;
  try { relative = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); response.end('Bad request'); return; }
  if (relative === '/') relative = '/index.html';
  for (const root of roots) {
    const filename = path.resolve(root, '.' + relative);
    const within = path.relative(root, filename);
    if (within.startsWith('..') || path.isAbsolute(within) || within.split(/[\\/]/).some(part => part.startsWith('.'))) continue;
    try {
      const data = await readFile(filename);
      response.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
      response.end(request.method === 'HEAD' ? undefined : data);
      return;
    } catch (error) { if (!['ENOENT', 'EISDIR', 'ENOTDIR'].includes(error.code)) console.error('Unable to serve requested file.'); }
  }
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Not found');
});
server.listen(port, host, () => console.log(`YC HERITAGE: http://${host}:${port}`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
