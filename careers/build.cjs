// Genera la copia compatible con file:// a partir del HTML de la sección.
// Ejecutar después de editar careers.html: node careers/build.cjs
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, 'careers.html'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'careers-template.js'),
    '// Generado desde careers.html con node careers/build.cjs. No editar directamente.\n' +
    'window.careersTemplate = ' + JSON.stringify(html) + ';\n');
