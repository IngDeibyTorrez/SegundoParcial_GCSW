La sección se edita en `careers.html`, sus estilos en `careers.css`, la información en `careers-data.js` y su comportamiento en `careers.js`.

Después de editar el HTML, ejecutar desde la raíz del proyecto:

```sh
node careers/build.cjs
```

Esto actualiza `careers-template.js`, la copia generada que permite abrir la página principal directamente como archivo local. Cuando se usa un servidor, el cargador obtiene `careers.html` mediante `fetch`.
