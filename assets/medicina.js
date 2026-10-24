// Información de Medicina, sede Santa Cruz. Fuente: https://www.uno.edu.bo/web/santacruz/carrera/medicina
// Consultada el 24 de octubre de 2026.
const medicinaData = {
  "title": "Medicina",
  "subtitle": "!Forma parte de la Familia UNO!",
  "description": "Formar médicos altamente calificados, con competencias técnicas y visión social, capaces de restaurar la salud individual y colectiva, promover municipios saludables e insertarse en programas nacionales de salud. Resuelven problemáticas sanitarias, prevalentes, estudian patologías complejas y contribuyen a mejorar la salud en Bolivia mediante investigación, participación en políticas públicas y una formación integral, priorizando prevención, equidad y compromiso ético con el desarrollo sostenible de las comunidades.",
  "rm": "R.M No 449/2012",
  "video": "https://www.youtube.com/watch?v=nTj6DBd096k",
  "malla": "mMedicina.webp",
  "cta": {
    "text": "Iniciar mi proceso de admisión",
    "link": "#"
  },
  "mission": "Impartir educación superior de calidad, para formar profesionales médicos, solidarios y democráticos al servicio de la comunidad.",
  "vision": "Ser una carrera líder en educación Superior acreditada, con proyección internacional, que forma médicos en un modelo educativo globalizado de competencias.",
  "roles": [
    "Atención médica integral: evaluación, tratamiento y seguimiento del bienestar total.",
    "Práctica quirúrgica: realización de cirugías seguras con conocimientos y técnicas avanzadas.",
    "Medicina comunitaria y salud pública: promoción y prevención de la salud en poblaciones.",
    "Producción científica e investigación: generar y difundir conocimiento médico riguroso.",
    "Docencia universitaria: enseñar habilidades y valores, formando profesionales críticos.",
    "Gestión y administración en salud: organizar recursos para atención eficiente y de calidad.",
    "Innovación y tecnología médica: usar nuevas herramientas para mejorar diagnósticos y tratamientos."
  ],
  "values": [
    "Ética profesional",
    "Vocación de servicio y solidaridad",
    "Respeto por la dignidad humana",
    "Compromiso comunitario y responsabilidad social",
    "Pensamiento crítico y compromiso con la ciencia",
    "Liderazgo y trabajo en equipo"
  ]
};

function showMedicineInfo() {
    const dialog = document.getElementById('medicine-dialog');
    const data = medicinaData;
    const list = items => `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    document.getElementById('medicine-content').innerHTML = `
        <div class="medicine-intro">
            <div>
                <span class="medicine-resolution">${data.rm}</span>
                <h3>Formación en Medicina</h3>
                <p>${data.description}</p>
            </div>
            <div>
                <iframe class="medicine-video" src="https://www.youtube.com/embed/nTj6DBd096k" title="Presentación oficial de la carrera de Medicina UNO" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>
                <p><a href="${data.video}" target="_blank" rel="noopener noreferrer">Ver video en YouTube ↗</a></p>
            </div>
        </div>
        <details class="medicine-section" open>
            <summary>Misión y visión</summary>
            <div class="medicine-section-content"><h3>Misión</h3><p>${data.mission}</p><h3 style="margin-top:20px">Visión</h3><p>${data.vision}</p></div>
        </details>
        <details class="medicine-section"><summary>Campo laboral</summary><div class="medicine-section-content">${list(data.roles)}</div></details>
        <details class="medicine-section"><summary>Valores</summary><div class="medicine-section-content">${list(data.values)}</div></details>
        <details class="medicine-section" open>
            <summary>Malla curricular</summary>
            <div class="medicine-section-content">
                <a href="assets/medicina-malla-curricular.webp" target="_blank" rel="noopener noreferrer" aria-label="Ampliar malla curricular de Medicina">
                    <img src="assets/medicina-malla-curricular.webp" alt="Malla curricular oficial de Medicina de la UNO, sede Santa Cruz" style="width:100%;height:auto" loading="lazy">
                </a>
                <div class="medicine-actions">
                    <a class="medicine-action" href="assets/medicina-malla-curricular.webp" target="_blank" rel="noopener noreferrer">Ampliar malla ↗</a>
                    <a class="medicine-action" href="assets/medicina-malla-curricular.webp" download="Malla-curricular-Medicina-UNO.webp">Descargar malla</a>
                </div>
            </div>
        </details>
        <details class="medicine-section" open>
            <summary>Solicitar información</summary>
            <div class="medicine-section-content"><p>Consulta los requisitos, horarios y el proceso de admisión de Medicina en la sede Santa Cruz.</p>
                <div class="medicine-actions"><a class="medicine-action medicine-action-whatsapp" href="https://wa.me/59162241035?text=${encodeURIComponent('Hola, deseo solicitar más información sobre la carrera de Medicina en la sede Santa Cruz.')}" target="_blank" rel="noopener noreferrer">Solicitar información por WhatsApp</a></div>
            </div>
        </details>
        <p class="medicine-source">Fuente: <a href="https://www.uno.edu.bo/web/santacruz/carrera/medicina" target="_blank" rel="noopener noreferrer">Medicina · sitio oficial de la UNO ↗</a><br>Información consultada el 24 de octubre de 2026.</p>`;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
}

document.getElementById('medicine-dialog').addEventListener('close', () => {
    document.body.style.overflow = '';
    document.getElementById('medicine-content').innerHTML = '';
});

document.getElementById('medicine-dialog').addEventListener('click', event => {
    const dialog = event.currentTarget;
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
