/**
 * ARCHIVO: logicaFormularios.js - Versión Funcional con Cédula y Correo
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener el tipo de beca de la URL (ej: formularios.html?tipo=Deportiva)
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo") || "Socioeconómica";

    const titulo = document.getElementById("tituloFormulario");
    const contenedorCampos = document.getElementById("camposEspecificos");

    // Verificamos que el campo oculto exista antes de asignar valor
    const inputTipo = document.getElementById("tipoBecaSeleccionada");
    if (inputTipo) inputTipo.value = tipo;

    if (titulo) titulo.innerText = `Solicitud de Beca ${tipo}`;

    // 2. Inyectar campos distintivos según el tipo (Mantenemos tu diseño original)
    let htmlExtra = "";
    if (tipo === "Deportiva") {
        htmlExtra = `
            <label class="form-label mt-3">Deporte que practica</label>
            <input type="text" id="deporte" class="form-control" placeholder="Ej: Natación, Fútbol..." required>
            
            <label class="form-label mt-3">Edad</label>
            <input type="number" id="edad" class="form-control" placeholder="Ej: 18" min="5" max="100" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            
            <label class="form-label mt-3">Años de experiencia en el deporte</label>
            <input type="number" id="experiencia" class="form-control" placeholder="Ej: 5" min="0" max="50" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            
            <label class="form-label mt-3">Nivel competitivo</label>
            <select id="nivelCompetitivo" class="form-control" required>
                <option value="">Seleccione una opción</option>
                <option value="Local">Local</option>
                <option value="Nacional">Nacional</option>
                <option value="Internacional">Internacional</option>
            </select>
            
            <label class="form-label mt-3">Horas de entrenamiento semanal</label>
            <input type="number" id="horasEntrenamiento" class="form-control" placeholder="Ej: 10" min="1" max="168" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            
            <label class="form-label mt-3">Logros destacados</label>
            <textarea id="logros" class="form-control" placeholder="Mencione sus medallas o trofeos" required></textarea>`;
    } else if (tipo === "Socioeconómica") {
        htmlExtra = `
            <label class="form-label mt-3">Ingresos familiares mensuales (₡)</label>
            <input type="number" id="ingresos" class="form-control" placeholder="₡ 0000" min="0" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            
            <label class="form-label mt-3">Cantidad de personas en el hogar</label>
            <input type="number" id="personas" class="form-control" placeholder="Ej: 4" min="1" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            
            <label class="form-label mt-3">Situación laboral del responsable económico</label>
            <select id="situacionLaboral" class="form-control" required>
                <option value="">Seleccione una opción</option>
                <option value="Empleado">Empleado</option>
                <option value="Desempleado">Desempleado</option>
                <option value="Independiente">Independiente</option>
                <option value="Pensionado">Pensionado</option>
            </select>
            
            <label class="form-label mt-3">Tipo de vivienda</label>
            <select id="tipoVivienda" class="form-control" required>
                <option value="">Seleccione una opción</option>
                <option value="Propia">Propia</option>
                <option value="Alquilada">Alquilada</option>
                <option value="Prestada">Prestada</option>
                <option value="Otro">Otro</option>
            </select>
            
            <label class="form-label mt-3">Gastos mensuales aproximados (₡)</label>
            <input type="number" id="gastosMensuales" class="form-control" placeholder="₡ 0000" min="0" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">`;
    } else if (tipo === "Cultural") {
        htmlExtra = `
            <label class="form-label mt-3">Disciplina artística/cultural</label>
            <select id="disciplina" class="form-control" required>
                <option value="">Seleccione una opción</option>
                <option value="Música">Música</option>
                <option value="Danza">Danza</option>
                <option value="Teatro">Teatro</option>
                <option value="Artes Plásticas">Artes Plásticas</option>
                <option value="Literatura">Literatura</option>
                <option value="Cine/Audiovisual">Cine/Audiovisual</option>
                <option value="Otra">Otra</option>
            </select>
            
            <label class="form-label mt-3">Años de experiencia</label>
            <input type="number" id="experienciaCultural" class="form-control" placeholder="Ej: 3" min="0" max="50" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            
            <label class="form-label mt-3">Institución o academia donde estudia</label>
            <input type="text" id="institucionCultural" class="form-control" placeholder="Ej: Conservatorio Nacional" required>
            
            <label class="form-label mt-3">Premios o reconocimientos</label>
            <textarea id="premios" class="form-control" placeholder="Mencione sus logros y reconocimientos" required></textarea>
            
            <label class="form-label mt-3">Proyecto o presentación destacada</label>
            <textarea id="proyectoCultural" class="form-control" placeholder="Describa su proyecto más importante" required></textarea>`;
    } else if (tipo === "Tecnológica") {
        htmlExtra = `
            <label class="form-label mt-3">Área tecnológica de interés</label>
            <select id="areaTecnologica" class="form-control" required>
                <option value="">Seleccione una opción</option>
                <option value="Programación/Desarrollo">Programación/Desarrollo</option>
                <option value="Robótica">Robótica</option>
                <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                <option value="Ciberseguridad">Ciberseguridad</option>
                <option value="Diseño UX/UI">Diseño UX/UI</option>
                <option value="Ciencia de Datos">Ciencia de Datos</option>
                <option value="Otra">Otra</option>
            </select>
            
            <label class="form-label mt-3">Lenguajes de programación que conoces</label>
            <input type="text" id="lenguajes" class="form-control" placeholder="Ej: Python, JavaScript, Java" required>
            
            <label class="form-label mt-3">Proyectos tecnológicos realizados</label>
            <textarea id="proyectosTech" class="form-control" placeholder="Describe tus proyectos más importantes" required></textarea>
            
            <label class="form-label mt-3">Certificaciones o cursos completados</label>
            <textarea id="certificaciones" class="form-control" placeholder="Menciona certificaciones relevantes"></textarea>
            
            <label class="form-label mt-3">Horas semanales dedicadas a proyectos tech</label>
            <input type="number" id="horasTech" class="form-control" placeholder="Ej: 10" min="1" max="168" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">`;
    } else if (tipo === "Liderazgo") {
        htmlExtra = `
            <label class="form-label mt-3">Tipo de liderazgo</label>
            <select id="tipoLiderazgo" class="form-control" required>
                <option value="">Seleccione una opción</option>
                <option value="Estudiantil">Estudiantil</option>
                <option value="Comunitario">Comunitario</option>
                <option value="Ambiental">Ambiental</option>
                <option value="Social">Social</option>
                <option value="Deportivo">Deportivo</option>
                <option value="Otro">Otro</option>
            </select>
            
            <label class="form-label mt-3">Organización o grupo que lideras</label>
            <input type="text" id="organizacion" class="form-control" placeholder="Ej: Consejo Estudiantil" required>
            
            <label class="form-label mt-3">Número de personas impactadas</label>
            <input type="number" id="personasImpactadas" class="form-control" placeholder="Ej: 50" min="1" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            
            <label class="form-label mt-3">Proyecto de impacto social</label>
            <textarea id="proyectoSocial" class="form-control" placeholder="Describe tu proyecto principal" required></textarea>
            
            <label class="form-label mt-3">Logros y reconocimientos</label>
            <textarea id="logrosLiderazgo" class="form-control" placeholder="Menciona tus logros como líder" required></textarea>
            
            <label class="form-label mt-3">Horas semanales dedicadas al proyecto</label>
            <input type="number" id="horasLiderazgo" class="form-control" placeholder="Ej: 8" min="1" max="168" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">`;
    } else {
        htmlExtra = `
            <label class="form-label mt-3">Promedio académico último año (0-100)</label>
            <input type="number" id="promedio" class="form-control" placeholder="Ej: 95" min="0" max="100" step="0.1" required oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
            
            <label class="form-label mt-3">Año académico actual</label>
            <select id="anoAcademico" class="form-control" required>
                <option value="">Seleccione una opción</option>
                <option value="1°">1° año</option>
                <option value="2°">2° año</option>
                <option value="3°">3° año</option>
                <option value="4°">4° año</option>
                <option value="5°">5° año</option>
                <option value="6°">6° año</option>
            </select>
            
            <label class="form-label mt-3">Institución de procedencia</label>
            <input type="text" id="institucion" class="form-control" placeholder="Ej: Colegio Nacional" required>
            
            <label class="form-label mt-3">Área de interés académico</label>
            <input type="text" id="areaInteres" class="form-control" placeholder="Ej: Ciencias, Matemáticas, Artes..." required>
            
            <label class="form-label mt-3">Horas de estudio semanal</label>
            <input type="number" id="horasEstudio" class="form-control" placeholder="Ej: 15" min="1" max="168" step="1" required oninput="this.value = this.value.replace(/[^0-9]/g, '')">
            
            <label class="form-label mt-3">Actividades extracurriculares</label>
            <textarea id="actividadesExtra" class="form-control" placeholder="Mencione clubes, voluntariados, etc." required></textarea>`;
    }

    if (contenedorCampos) contenedorCampos.innerHTML = htmlExtra;
});

// 3. Guardar la información (ACTUALIZADO con todos los nuevos campos)
document.getElementById("formSolicitudDinamico")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const tipoBeca = document.getElementById("tipoBecaSeleccionada").value;

    // Validaciones específicas por tipo de beca
    if (tipoBeca === "Deportiva") {
        const edad = parseInt(document.getElementById("edad").value);
        const experiencia = parseInt(document.getElementById("experiencia").value);
        const horasEntrenamiento = parseInt(document.getElementById("horasEntrenamiento").value);

        if (edad < 5 || edad > 100) {
            Swal.fire({
                icon: 'error',
                title: 'Error en la edad',
                text: 'La edad debe estar entre 5 y 100 años.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
        if (experiencia < 0 || experiencia > 50) {
            Swal.fire({
                icon: 'error',
                title: 'Error en experiencia',
                text: 'Los años de experiencia deben estar entre 0 y 50.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
        if (horasEntrenamiento < 1 || horasEntrenamiento > 168) {
            Swal.fire({
                icon: 'error',
                title: 'Error en horas de entrenamiento',
                text: 'Las horas de entrenamiento deben estar entre 1 y 168 por semana.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
    } else if (tipoBeca === "Socioeconómica") {
        const ingresos = parseFloat(document.getElementById("ingresos").value);
        const personas = parseInt(document.getElementById("personas").value);
        const gastosMensuales = parseFloat(document.getElementById("gastosMensuales").value);

        if (ingresos < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error en ingresos',
                text: 'Los ingresos familiares no pueden ser negativos.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
        if (personas < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Error en cantidad de personas',
                text: 'La cantidad de personas debe ser al menos 1.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
        if (gastosMensuales < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error en gastos',
                text: 'Los gastos mensuales no pueden ser negativos.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
    } else { // Académica
        const promedio = parseFloat(document.getElementById("promedio").value);
        const horasEstudio = parseInt(document.getElementById("horasEstudio").value);

        if (promedio < 0 || promedio > 100) {
            Swal.fire({
                icon: 'error',
                title: 'Error en promedio',
                text: 'El promedio debe estar entre 0 y 100.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
        if (horasEstudio < 1 || horasEstudio > 168) {
            Swal.fire({
                icon: 'error',
                title: 'Error en horas de estudio',
                text: 'Las horas de estudio deben estar entre 1 y 168 por semana.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
    }

    // Capturamos los campos comunes
    const nuevaSolicitud = {
        id: Date.now(),
        nombre: document.getElementById("nombre").value,
        cedula: document.getElementById("cedula").value,
        correo: document.getElementById("correo").value,
        tipoBeca: tipoBeca,
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString()
    };

    // Agregamos campos específicos según el tipo de beca
    if (tipoBeca === "Deportiva") {
        nuevaSolicitud.deporte = document.getElementById("deporte").value;
        nuevaSolicitud.edad = document.getElementById("edad").value;
        nuevaSolicitud.experiencia = document.getElementById("experiencia").value;
        nuevaSolicitud.nivelCompetitivo = document.getElementById("nivelCompetitivo").value;
        nuevaSolicitud.horasEntrenamiento = document.getElementById("horasEntrenamiento").value;
        nuevaSolicitud.logros = document.getElementById("logros").value;
    } else if (tipoBeca === "Socioeconómica") {
        nuevaSolicitud.ingresos = document.getElementById("ingresos").value;
        nuevaSolicitud.personas = document.getElementById("personas").value;
        nuevaSolicitud.situacionLaboral = document.getElementById("situacionLaboral").value;
        nuevaSolicitud.tipoVivienda = document.getElementById("tipoVivienda").value;
        nuevaSolicitud.gastosMensuales = document.getElementById("gastosMensuales").value;
    } else if (tipoBeca === "Cultural") {
        nuevaSolicitud.disciplina = document.getElementById("disciplina").value;
        nuevaSolicitud.experienciaCultural = document.getElementById("experienciaCultural").value;
        nuevaSolicitud.institucionCultural = document.getElementById("institucionCultural").value;
        nuevaSolicitud.premios = document.getElementById("premios").value;
        nuevaSolicitud.proyectoCultural = document.getElementById("proyectoCultural").value;
    } else if (tipoBeca === "Tecnológica") {
        nuevaSolicitud.areaTecnologica = document.getElementById("areaTecnologica").value;
        nuevaSolicitud.lenguajes = document.getElementById("lenguajes").value;
        nuevaSolicitud.proyectosTech = document.getElementById("proyectosTech").value;
        nuevaSolicitud.certificaciones = document.getElementById("certificaciones").value;
        nuevaSolicitud.horasTech = document.getElementById("horasTech").value;
    } else if (tipoBeca === "Liderazgo") {
        nuevaSolicitud.tipoLiderazgo = document.getElementById("tipoLiderazgo").value;
        nuevaSolicitud.organizacion = document.getElementById("organizacion").value;
        nuevaSolicitud.personasImpactadas = document.getElementById("personasImpactadas").value;
        nuevaSolicitud.proyectoSocial = document.getElementById("proyectoSocial").value;
        nuevaSolicitud.logrosLiderazgo = document.getElementById("logrosLiderazgo").value;
        nuevaSolicitud.horasLiderazgo = document.getElementById("horasLiderazgo").value;
    } else { // Académica
        nuevaSolicitud.promedio = document.getElementById("promedio").value;
        nuevaSolicitud.anoAcademico = document.getElementById("anoAcademico").value;
        nuevaSolicitud.institucion = document.getElementById("institucion").value;
        nuevaSolicitud.areaInteres = document.getElementById("areaInteres").value;
        nuevaSolicitud.horasEstudio = document.getElementById("horasEstudio").value;
        nuevaSolicitud.actividadesExtra = document.getElementById("actividadesExtra").value;
    }

    let solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    solicitudes.push(nuevaSolicitud);
    localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudes));

    Swal.fire({
        icon: 'success',
        title: '¡Solicitud enviada!',
        text: 'El administrador la revisará pronto.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.href = "home.html";
    });
});