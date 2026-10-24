// Servidor local sin dependencias para cargar las secciones HTML del proyecto.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const home = 'landing_institucional_uno_santa_cruz.html';
const types = {'.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.webp':'image/webp', '.jpg':'image/jpeg', '.png':'image/png'};
const server = http.createServer((request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, {Allow:'GET, HEAD'}).end();
        return;
    }
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname); }
    catch { response.writeHead(400).end(); return; }
    const relative = pathname === '/' ? home : pathname.slice(1);
    const file = path.resolve(root, relative);
    if ((!relative.startsWith('assets/') && !relative.startsWith('careers/') && relative !== home) || !file.startsWith(root + path.sep)) {
        response.writeHead(404).end(); return;
    }
    fs.readFile(file, (error, content) => {
        if (error) { response.writeHead(404).end(); return; }
        response.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Referrer-Policy':'strict-origin-when-cross-origin', 'Cache-Control':'no-cache'});
        response.end(request.method === 'HEAD' ? undefined : content);
    });
});
server.on('error', error => { console.error(`No se pudo iniciar el servidor: ${error.message}`); process.exitCode = 1; });
server.listen(5500, '127.0.0.1', () => console.log('Proyecto: http://127.0.0.1:5500'));
