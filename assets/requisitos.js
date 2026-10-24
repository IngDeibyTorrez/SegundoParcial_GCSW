/**
 * Módulo de Gestión de Requisitos de Admisión - Universidad UNO Santa Cruz
 * Asignatura: Gestión de Configuración del Software (GCS)
 * Autor: Eddy Mamani
 * Versión: 1.0.0
 * Descripción: Manejador interactivo de validación de documentos, cálculo de avance,
 *              persistencia en LocalStorage y exportación a WhatsApp/Impresión.
 */

const requisitosData = {
    nacionales: {
        titulo: "Estudiantes Bachilleres Nacionales (Bolivia)",
        descripcion: "Documentación oficial exigida por el Ministerio de Educación y la Universidad UNO.",
        documentos: [
            { id: "nac-tit", texto: "Fotocopia Legalizada del Título de Bachiller", requerido: true, detalle: "Legalizado por la Dirección Departamental de Educación (DDE) o Cédula Escolar original." },
            { id: "nac-ci", texto: "2 Fotocopias Simples de Cédula de Identidad", requerido: true, detalle: "Documento de identidad vigente y a color legible." },
            { id: "nac-nac", texto: "Certificado de Nacimiento Original", requerido: true, detalle: "Emitido por el SERECI actualizado." },
            { id: "nac-foto", texto: "3 Fotografías 3x4 Fondo Blanco", requerido: true, detalle: "Fotografías de estudio con vestimenta formal." },
            { id: "nac-form", texto: "Formulario Oficial de Inscripción", requerido: true, detalle: "Completado y firmado por el postulante o apoderado." },
            { id: "nac-mat", texto: "Comprobante de Pago de Matrícula", requerido: false, detalle: "Boleta de depósito bancario o comprobante de transferencia QR." }
        ]
    },
    extranjeros: {
        titulo: "Estudiantes Internacionales",
        descripcion: "Documentación para postulantes extranjeros legalizada por la vía consular o apostilla de La Haya.",
        documentos: [
            { id: "ext-tit", texto: "Título de Secundaria / Bachiller Apostillado", requerido: true, detalle: "Apostilla del Convenio de La Haya o legalización por Cancillería." },
            { id: "ext-pas", texto: "Fotocopia de Pasaporte y Visa de Estudiante", requerido: true, detalle: "Visa vigente emitida por la Dirección General de Migración Bolivia." },
            { id: "ext-nac", texto: "Certificado de Nacimiento Apostillado", requerido: true, detalle: "Documento oficial del país de origen debidamente apostillado." },
            { id: "ext-ant", texto: "Certificado de Antecedentes Policiales / Judiciales", requerido: true, detalle: "Emitido en el país de origen o residencia." },
            { id: "ext-foto", texto: "3 Fotografías 3x4 Fondo Blanco", requerido: true, detalle: "Tamaño carnet formal." }
        ]
    },
    traspaso: {
        titulo: "Traspasos de Otras Universidades",
        descripcion: "Requisitos complementarios para convalidación de materias cursadas en otras casas de estudio.",
        documentos: [
            { id: "tras-cert", texto: "Certificado de Calificaciones Original", requerido: true, detalle: "Firmado y sellado por las autoridades de la universidad de origen." },
            { id: "tras-cont", texto: "Planes y Contenidos Analíticos Legalizados", requerido: true, detalle: "Contenidos de cada materia que solicita convalidar." },
            { id: "tras-noinf", texto: "Certificado de No Infracción o Buena Conducta", requerido: true, detalle: "Expedido por la universidad de procedencia." },
            { id: "tras-nac", texto: "Documentos Básicos de Admisión Nacional/Extranjero", requerido: true, detalle: "Título de bachiller, carnet/pasaporte y certificado de nacimiento." }
        ]
    }
};

const STORAGE_KEY = "uno_requisitos_estado_v1";
let tipoSeleccionado = 'nacionales';
let estadoChecklist = {};

// Cargar persistencia de LocalStorage
function cargarEstadoLocalStorage() {
    try {
        const guardado = localStorage.getItem(STORAGE_KEY);
        if (guardado) {
            estadoChecklist = JSON.parse(guardado) || {};
        }
    } catch (e) {
        console.warn("No se pudo cargar el estado desde localStorage:", e);
    }
}

// Guardar persistencia en LocalStorage
function guardarEstadoLocalStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(estadoChecklist));
    } catch (e) {
        console.warn("No se pudo guardar en localStorage:", e);
    }
}

// Inicializa el asistente interactivo
function inicializarAsistenteRequisitos() {
    const contenedor = document.getElementById('asistente-requisitos-app');
    if (!contenedor) return;

    cargarEstadoLocalStorage();
    renderizarInterfaz();
}

function cambiarTipoRequisito(tipo) {
    tipoSeleccionado = tipo;
    renderizarInterfaz();
}

function alternarDocumento(id) {
    estadoChecklist[id] = !estadoChecklist[id];
    guardarEstadoLocalStorage();
    actualizarProgreso();
}

function reiniciarChecklistRequisitos() {
    if (confirm("¿Deseas reiniciar la lista de requisitos marcados?")) {
        estadoChecklist = {};
        guardarEstadoLocalStorage();
        renderizarInterfaz();
    }
}

function imprimirChecklistRequisitos() {
    window.print();
}

function renderizarInterfaz() {
    const contenedor = document.getElementById('asistente-requisitos-app');
    if (!contenedor) return;

    const data = requisitosData[tipoSeleccionado];

    contenedor.innerHTML = `
        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 mt-8 print:p-0 print:border-none print:shadow-none">
            <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                    <span class="inline-block bg-uno-blue/10 text-uno-blue text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                        Herramienta de Autoevaluación
                    </span>
                    <h4 class="text-2xl font-extrabold text-uno-navy">${data.titulo}</h4>
                    <p class="text-sm text-slate-500 mt-1">${data.descripcion}</p>
                </div>
                <div class="flex flex-wrap gap-2 print:hidden">
                    <button onclick="cambiarTipoRequisito('nacionales')" class="px-4 py-2 rounded-lg text-xs font-bold transition ${tipoSeleccionado === 'nacionales' ? 'bg-uno-blue text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                        Nacionales
                    </button>
                    <button onclick="cambiarTipoRequisito('extranjeros')" class="px-4 py-2 rounded-lg text-xs font-bold transition ${tipoSeleccionado === 'extranjeros' ? 'bg-uno-blue text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                        Extranjeros
                    </button>
                    <button onclick="cambiarTipoRequisito('traspaso')" class="px-4 py-2 rounded-lg text-xs font-bold transition ${tipoSeleccionado === 'traspaso' ? 'bg-uno-blue text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                        Traspaso
                    </button>
                </div>
            </div>

            <!-- Barra de Progreso -->
            <div class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-xs font-bold text-slate-600 uppercase tracking-wide">Avance de tu Carpeta:</span>
                    <span id="texto-progreso" class="text-sm font-black text-uno-navy">0%</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div id="barra-progreso" class="bg-uno-gold h-3 transition-all duration-300" style="width: 0%"></div>
                </div>
                <p id="mensaje-estado" class="text-xs text-slate-500 mt-2">Marca los documentos que ya tienes listos para postularte.</p>
            </div>

            <!-- Lista de Chequeo -->
            <div class="mt-6 space-y-3">
                ${data.documentos.map(doc => `
                    <label class="flex items-start p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50/80 cursor-pointer transition select-none">
                        <input type="checkbox" onchange="alternarDocumento('${doc.id}')" ${estadoChecklist[doc.id] ? 'checked' : ''} class="mt-1 h-5 w-5 rounded border-slate-300 text-uno-blue focus:ring-uno-blue cursor-pointer">
                        <div class="ml-3.5 flex-1">
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-800 text-sm">${doc.texto}</span>
                                ${doc.requerido ? '<span class="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded">Obligatorio</span>' : '<span class="text-[10px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded">Opcional</span>'}
                            </div>
                            <p class="text-xs text-slate-500 mt-0.5">${doc.detalle}</p>
                        </div>
                    </label>
                `).join('')}
            </div>

            <!-- Acciones -->
            <div class="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                <div class="flex items-center gap-2">
                    <button onclick="reiniciarChecklistRequisitos()" title="Limpiar casillas" class="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5">
                        <i class="fas fa-undo"></i> Reiniciar
                    </button>
                    <button onclick="imprimirChecklistRequisitos()" title="Imprimir checklist" class="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5">
                        <i class="fas fa-print"></i> Imprimir Ficha
                    </button>
                </div>
                <button onclick="enviarWhatsAppAdmisiones()" id="btn-whatsapp-req" class="w-full sm:w-auto px-6 py-3 bg-uno-green hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2">
                    <i class="fab fa-whatsapp text-lg"></i> Consultar por WhatsApp
                </button>
            </div>
        </div>
    `;

    actualizarProgreso();
}

function actualizarProgreso() {
    const data = requisitosData[tipoSeleccionado];
    const totalDocs = data.documentos.length;
    let docsCompletados = 0;

    data.documentos.forEach(doc => {
        if (estadoChecklist[doc.id]) {
            docsCompletados++;
        }
    });

    const porcentaje = Math.round((docsCompletados / totalDocs) * 100);
    const barra = document.getElementById('barra-progreso');
    const texto = document.getElementById('texto-progreso');
    const mensaje = document.getElementById('mensaje-estado');

    if (barra && texto && mensaje) {
        barra.style.width = `${porcentaje}%`;
        texto.innerText = `${porcentaje}% (${docsCompletados} de ${totalDocs})`;

        if (porcentaje === 100) {
            barra.className = 'bg-uno-green h-3 transition-all duration-300';
            mensaje.innerHTML = '<strong class="text-emerald-700">¡Excelente! Tienes todos tus requisitos completos para inscribirte.</strong>';
        } else if (porcentaje >= 50) {
            barra.className = 'bg-uno-blue h-3 transition-all duration-300';
            mensaje.innerHTML = '<span class="text-slate-600">¡Buen avance! Ya tienes más de la mitad de tu documentación.</span>';
        } else {
            barra.className = 'bg-uno-gold h-3 transition-all duration-300';
            mensaje.innerHTML = '<span class="text-slate-500">Marca los documentos que ya tienes listos para postularte.</span>';
        }
    }
}

function enviarWhatsAppAdmisiones() {
    const data = requisitosData[tipoSeleccionado];
    let mensaje = `Hola Universidad UNO, soy postulante (${data.titulo}). He verificado mis requisitos en la web:%0A`;

    data.documentos.forEach(doc => {
        const estado = estadoChecklist[doc.id] ? 'LISTO' : 'PENDIENTE';
        mensaje += `- [${estado}] ${doc.texto}%0A`;
    });

    mensaje += `%0ADeseo recibir información para completar mi inscripción.`;
    window.open(`https://wa.me/59162241035?text=${mensaje}`, '_blank');
}

// Inicializar cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', inicializarAsistenteRequisitos);
