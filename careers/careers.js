// Ventana compartida para la información oficial de cada carrera.
const careerDialog = document.getElementById('career-dialog');
const careerContent = document.getElementById('career-content');
const escapeCareerText = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
let careerPreviousOverflow = '';

function showCareerDetails(slug) {
    const data = carrerasData.find(career => career.slug === slug);
    if (!data) return;
    const text = escapeCareerText;
    const title = slug === 'ingenieria-de-sistemas' ? 'Ingeniería de Sistemas' : data.title;
    const list = items => `<ul>${items.map(item => `<li>${text(item)}</li>`).join('')}</ul>`;
    const media = data.imageLocal ? `
        <img src="${text(data.imageLocal)}" alt="Presentación de ${text(title)}, UNO Santa Cruz" style="width:100%;height:auto;border-radius:12px" loading="lazy">` : '';
    const curriculum = data.mallaLocal ? `
        <a href="${text(data.mallaLocal)}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar malla curricular de ${text(title)}">
            <img src="${text(data.mallaLocal)}" alt="Malla curricular oficial de ${text(title)}, UNO Santa Cruz" style="width:100%;height:auto" loading="lazy">
        </a>
        <div class="career-actions">
            <a class="career-action" href="${text(data.mallaLocal)}" target="_blank" rel="noopener noreferrer">Ampliar malla ↗</a>
        </div>` : `<p>La malla curricular no está disponible en el sitio oficial. Solicítala a la universidad mediante el botón de información.</p>`;
    document.getElementById('career-title').textContent = title;
    document.getElementById('career-area').textContent = `${data.area} · SEDE SANTA CRUZ`;
    document.getElementById('career-close').setAttribute('aria-label', `Cerrar información de ${title}`);
    careerContent.innerHTML = `
        <div class="career-intro">
            <div>
                <span class="career-resolution">${data.rm ? text(data.rm) : 'Resolución ministerial: pendiente de confirmación oficial'}</span>
                <h3>Formación en ${text(title)}</h3>
                <p style="white-space:pre-line">${text(data.description.replace(/\\n/g, '\n'))}</p>
            </div>
            <div>${media}</div>
        </div>
        <details class="career-section" open>
            <summary>Misión y visión</summary>
            <div class="career-section-content"><h3>Misión</h3><p>${text(data.mission)}</p><h3 style="margin-top:20px">Visión</h3><p>${text(data.vision)}</p></div>
        </details>
        <details class="career-section"><summary>Campo laboral</summary><div class="career-section-content">${list(data.roles)}</div></details>
        <details class="career-section"><summary>Valores</summary><div class="career-section-content">${list(data.values)}</div></details>
        <details class="career-section" open><summary>Malla curricular</summary><div class="career-section-content">${curriculum}</div></details>
        <details class="career-section" open>
            <summary>Solicitar información</summary>
            <div class="career-section-content"><p>Consulta los requisitos, horarios y el proceso de admisión de ${text(title)} en la sede Santa Cruz.</p>
                <div class="career-actions"><a class="career-action career-action-whatsapp" href="https://wa.me/59162241035?text=${encodeURIComponent(`Hola, deseo solicitar más información sobre la carrera de ${title} en la sede Santa Cruz.`)}" target="_blank" rel="noopener noreferrer">Solicitar información por WhatsApp</a></div>
            </div>
        </details>`;
    careerPreviousOverflow = document.body.style.overflow;
    careerDialog.showModal();
    careerDialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
}

careerDialog.addEventListener('close', () => {
    document.body.style.overflow = careerPreviousOverflow;
    careerContent.innerHTML = '';
});

careerDialog.addEventListener('click', event => {
    const rect = careerDialog.getBoundingClientRect();
    if (event.target === careerDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) careerDialog.close();
});
