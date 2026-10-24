/* ==========================================================================
   Red Alumno · Comunidad de graduados UNO
   1. Las cifras cuentan desde cero al entrar en pantalla.
   2. El registro valida los datos y abre WhatsApp con el mensaje armado.
   Todo queda dentro de la sección #alumni: no toca nada del resto de la página.
   ========================================================================== */

(function () {
    'use strict';

    const seccion = document.getElementById('alumni');
    if (!seccion) return;

    const WHATSAPP = 'https://wa.me/59162241035';
    const ANIO_MINIMO = 1995;
    const DURACION_CONTEO_MS = 1400;

    /* --- 1. Cifras ------------------------------------------------------- */

    function animarCifra(nodo) {
        const objetivo = Number(nodo.dataset.contador);
        const prefijo = nodo.dataset.prefijo || '';
        const sufijo = nodo.dataset.sufijo || '';
        const final = nodo.textContent;
        let inicio = null;
        let terminado = false;

        function terminar() {
            terminado = true;
            nodo.textContent = final;
        }

        function cuadro(ahora) {
            // Un cuadro atrasado no debe pisar la cifra final.
            if (terminado) return;
            inicio = inicio || ahora;
            const t = Math.min(1, (ahora - inicio) / DURACION_CONTEO_MS);
            if (t >= 1) return terminar();
            const valor = Math.round(objetivo * (1 - Math.pow(1 - t, 4)));
            nodo.textContent = prefijo + valor.toLocaleString('en-US') + sufijo;
            requestAnimationFrame(cuadro);
        }

        requestAnimationFrame(cuadro);
        // Si la pestaña queda en segundo plano, la cifra igual termina en su valor.
        setTimeout(terminar, DURACION_CONTEO_MS + 200);
    }

    function iniciarCifras() {
        const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (movimientoReducido || !('IntersectionObserver' in window)) return;

        const cifras = seccion.querySelectorAll('[data-contador]');
        const observador = new IntersectionObserver(function (entradas) {
            if (entradas.some(function (entrada) { return entrada.isIntersecting; })) {
                cifras.forEach(animarCifra);
                observador.disconnect();
            }
        }, { threshold: 0.3 });

        observador.observe(seccion);
    }

    /* --- 2. Registro ----------------------------------------------------- */

    function iniciarRegistro() {
        const form = document.getElementById('red-alumno-form');
        const listo = document.getElementById('red-alumno-listo');
        const listoTexto = document.getElementById('red-alumno-listo-texto');
        const enlaceWhatsapp = document.getElementById('red-alumno-whatsapp');
        const anioActual = new Date().getFullYear();

        form.egreso.max = anioActual;

        function marcar(campo, esValido) {
            form.querySelector('[data-error="' + campo + '"]').hidden = esValido;
            form[campo].classList.toggle('red-alumno__campo--error', !esValido);
            form[campo].setAttribute('aria-invalid', String(!esValido));
            return esValido;
        }

        function validar(nombre, carrera, egreso) {
            return {
                nombre: marcar('nombre', nombre.split(/\s+/).length >= 2),
                carrera: marcar('carrera', carrera !== ''),
                egreso: marcar('egreso', Number.isInteger(egreso) && egreso >= ANIO_MINIMO && egreso <= anioActual),
            };
        }

        form.addEventListener('submit', function (evento) {
            evento.preventDefault();

            const nombre = form.nombre.value.trim();
            const carrera = form.carrera.value;
            const egreso = Number(form.egreso.value);
            const resultado = validar(nombre, carrera, egreso);

            const primerError = Object.keys(resultado).find(function (campo) { return !resultado[campo]; });
            if (primerError) {
                // Lleva el cursor al primer dato que falta.
                form[primerError].focus();
                return;
            }

            const mensaje = 'Hola, soy ' + nombre + ', egresado de ' + carrera +
                ' (' + egreso + '). Quiero unirme a la Red Alumno de la UNO.';
            const enlace = WHATSAPP + '?text=' + encodeURIComponent(mensaje);
            window.open(enlace, '_blank', 'noopener');

            // Confirmación, por si el navegador bloqueó la ventana nueva.
            listoTexto.textContent = nombre.split(/\s+/)[0] + ', te abrimos WhatsApp con tu mensaje listo. ' +
                'Envíalo y la oficina de egresados te dará de alta.';
            enlaceWhatsapp.href = enlace;
            form.hidden = true;
            listo.hidden = false;
        });
    }

    iniciarCifras();
    iniciarRegistro();
})();
