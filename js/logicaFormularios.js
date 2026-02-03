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
            <input type="text" id="extra" class="form-control" placeholder="Ej: Natación, Fútbol..." required>
            <label class="form-label mt-3">Logros destacados</label>
            <textarea id="detalles" class="form-control" placeholder="Mencione sus medallas o trofeos"></textarea>`;
    } else if (tipo === "Socioeconómica") {
        htmlExtra = `
            <label class="form-label mt-3">Ingresos familiares mensuales</label>
            <input type="number" id="extra" class="form-control" placeholder="₡ 0000" required>
            <label class="form-label mt-3">Cantidad de personas en el hogar</label>
            <input type="number" id="detalles" class="form-control" required>`;
    } else {
        htmlExtra = `
            <label class="form-label mt-3">Promedio académico último año</label>
            <input type="text" id="extra" class="form-control" placeholder="Ej: 95/100" required>
            <label class="form-label mt-3">Institución de procedencia</label>
            <input type="text" id="detalles" class="form-control" required>`;
    }
    
    if (contenedorCampos) contenedorCampos.innerHTML = htmlExtra;
});

// 3. Guardar la información (ACTUALIZADO con Cédula y Correo)
document.getElementById("formSolicitudDinamico")?.addEventListener("submit", (e) => {
    e.preventDefault();

    // Capturamos los nuevos campos que corregimos en Formulario.html
    const nuevaSolicitud = {
        id: Date.now(),
        nombre: document.getElementById("nombre").value,
        cedula: document.getElementById("cedula").value,  // <-- Nuevo campo capturado
        correo: document.getElementById("correo").value,  // <-- Nuevo campo capturado
        tipoBeca: document.getElementById("tipoBecaSeleccionada").value,
        datoExtra: document.getElementById("extra").value, 
        detalles: document.getElementById("detalles").value,
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString()
    };

    let solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    solicitudes.push(nuevaSolicitud);
    localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudes));

    alert("¡Solicitud enviada con éxito! El administrador la revisará pronto.");
    window.location.href = "home.html"; // Redirigimos a home tras el éxito
});