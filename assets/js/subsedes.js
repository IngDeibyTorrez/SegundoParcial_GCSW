/**
 * ==========================================================================
 * Modulo Interactivo de SubSedes y Centros de Extension
 * Universidad Nacional del Oriente (UNO)
 * Desarrollado por: Cesar Villegas
 * ==========================================================================
 */

// Base de datos de SubSedes Nacionales UNO
const sedesData = {
    santacruz: {
        nombre: "SubSede Santa Cruz de la Sierra (Sede Central)",
        direccion: "Calle Libertad esq. Andrés Ibáñez / Calle 24 de Septiembre",
        telefono: "333-7577 / 62241035",
        detalles: "Cuenta con Laboratorios de Anatomía, Farmacia, Clínica Odontológica acreditada, Aulas Digitales y Centro de Cómputo.",
        imagen: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=600&auto=format&fit=crop"
    },
    montero: {
        nombre: "SubSede Montero",
        direccion: "Av. Principal del Norte, Montero - Santa Cruz",
        telefono: "3 922-4000",
        detalles: "Infraestructura académica completa para la formación en salud y área comercial para el norte integrado.",
        imagen: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=600&auto=format&fit=crop"
    },
    cochabamba: {
        nombre: "SubSede Cochabamba",
        direccion: "Zona Central, Cochabamba",
        telefono: "4 450-8000",
        detalles: "Sede equipada para el área de salud, medicina e investigación en el valle boliviano.",
        imagen: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop"
    },
    shinahota: {
        nombre: "SubSede Shinahota",
        direccion: "Trópico de Cochabamba, Shinahota",
        telefono: "4 413-6000",
        detalles: "Formación académica profesional con compromiso con el desarrollo regional rural y comunitario.",
        imagen: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=600&auto=format&fit=crop"
    },
    tarija: {
        nombre: "SubSede Tarija",
        direccion: "Zona Universitaria, Tarija",
        telefono: "4 664-3000",
        detalles: "Campus moderno integrado con clínicas universitarias y salas de simulación clínica.",
        imagen: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
    },
    yacuiba: {
        nombre: "SubSede Yacuiba",
        direccion: "Gran Chaco, Yacuiba",
        telefono: "4 682-2000",
        detalles: "Atención educativa superior para la región fronteriza del Gran Chaco boliviano.",
        imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
    }
};

/**
 * Cambia la sede mostrada dinámicamente y actualiza los tabs interactivos
 * @param {string} key - Identificador de la subsede ('santacruz', 'montero', etc.)
 */
function switchSede(key) {
    const data = sedesData[key];
    const detailContainer = document.getElementById('sede-detail');
    if (!data || !detailContainer) return;
    
    // Actualizar estilo visual de los botones
    document.querySelectorAll('.sede-btn').forEach(btn => {
        btn.className = 'sede-btn px-5 py-2.5 rounded-full font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition inline-flex items-center gap-2';
    });

    const activeBtn = document.getElementById(`tab-${key}`);
    if (activeBtn) {
        activeBtn.className = 'sede-btn px-5 py-2.5 rounded-full font-bold text-sm bg-uno-navy text-white shadow-lg transition inline-flex items-center gap-2 ring-2 ring-uno-gold/50';
    }

    // Renderizar tarjeta de contenido de la sede
    detailContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200/80 mb-2">
                    <i class="fas fa-map-marker-alt text-uno-gold text-xs"></i>
                    <span class="text-xs font-bold text-uno-navy uppercase tracking-wider">SubSede Seleccionada</span>
                </div>
                <h4 class="text-2xl sm:text-3xl font-extrabold text-uno-navy mb-3 tracking-tight">${data.nombre}</h4>
                <p class="text-slate-600 text-sm mb-5 leading-relaxed">${data.detalles}</p>
                
                <div class="space-y-3 mb-6">
                    <div class="flex items-start bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
                        <div class="w-8 h-8 rounded-lg bg-blue-50 text-uno-blue flex items-center justify-center shrink-0 mr-3 mt-0.5">
                            <i class="fas fa-map-pin"></i>
                        </div>
                        <div>
                            <span class="text-xs font-bold text-slate-400 block uppercase">Dirección</span>
                            <span class="text-sm font-semibold text-slate-700">${data.direccion}</span>
                        </div>
                    </div>
                    <div class="flex items-start bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
                        <div class="w-8 h-8 rounded-lg bg-blue-50 text-uno-blue flex items-center justify-center shrink-0 mr-3 mt-0.5">
                            <i class="fas fa-phone-alt"></i>
                        </div>
                        <div>
                            <span class="text-xs font-bold text-slate-400 block uppercase">Teléfono de Contacto</span>
                            <span class="text-sm font-semibold text-slate-700">${data.telefono}</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                    <a href="https://wa.me/59162241035?text=Hola,%20quisiera%20información%20sobre%20la%20sede%20${encodeURIComponent(data.nombre)}" target="_blank" class="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5">
                        <i class="fab fa-whatsapp text-base mr-2"></i> Consultar por WhatsApp <i class="fas fa-arrow-right ml-2 text-xs"></i>
                    </a>
                </div>
            </div>

            <div class="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-200 group bg-slate-100">
                <img src="${data.imagen}" alt="${data.nombre}" class="w-full h-full object-cover sede-card-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=600&auto=format&fit=crop';">
                <div class="absolute inset-0 bg-gradient-to-t from-uno-navy/60 via-transparent to-transparent pointer-events-none"></div>
                <div class="absolute top-3 right-3 bg-uno-navy/90 text-white backdrop-blur text-xs px-3 py-1 rounded-full font-semibold border border-uno-gold/40 flex items-center gap-1.5 shadow pointer-events-none">
                    <i class="fas fa-university text-uno-gold"></i> Campus Oficial UNO
                </div>
            </div>
        </div>
    `;
}

// Inicializar la sede principal al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    switchSede('santacruz');
});
