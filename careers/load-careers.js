// Carga el HTML antes de inicializar los controles de la sección.
(() => {
    const base = new URL('.', document.currentScript.src);
    const root = document.getElementById('careers-root');
    function loadScript(filename) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = new URL(filename, base).href;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }
    async function loadHTML() {
        // Los scripts locales sí se pueden cargar desde file://; fetch no.
        if (window.location.protocol !== 'file:') {
            try {
                const response = await fetch(new URL('careers.html', base));
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.text();
            } catch {
                // Si falla la petición, se usa la misma sección empaquetada.
            }
        }
        await loadScript('careers-template.js');
        return window.careersTemplate;
    }
    async function loadCareers() {
        try {
            root.innerHTML = await loadHTML();
            await loadScript('careers.js');
            if (window.location.hash === '#carreras') document.getElementById('carreras').scrollIntoView();
        } catch (error) {
            root.replaceChildren();
            const message = document.createElement('p');
            message.className = 'text-center py-8 text-slate-600';
            message.textContent = 'No se pudo cargar la sección de carreras. Recarga la página para intentarlo de nuevo.';
            root.appendChild(message);
            console.error('No se pudo cargar la sección de carreras:', error);
        }
    }
    loadCareers();
})();
