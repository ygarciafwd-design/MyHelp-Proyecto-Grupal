document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener el tipo de beca de la URL (ej: formularios.html?tipo=Deportiva)
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo") || "Socioeconómica";
    
    const titulo = document.getElementById("tituloFormulario");
    const contenedorCampos = document.getElementById("camposEspecificos");
    document.getElementById("tipoBecaSeleccionada").value = tipo;

    titulo.innerText = `Solicitud de Beca ${tipo}`;

    // 2. Inyectar campos distintivos según el tipo
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
    contenedorCampos.innerHTML = htmlExtra;
});

// 3. Guardar la información
document.getElementById("formSolicitudDinamico").addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevaSolicitud = {
        id: Date.now(),
        nombre: document.getElementById("nombre").value,
        tipoBeca: document.getElementById("tipoBecaSeleccionada").value,
        datoExtra: document.getElementById("extra").value, // Guardamos el campo distintivo
        detalles: document.getElementById("detalles").value,
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString()
    };

    let solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    solicitudes.push(nuevaSolicitud);
    localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudes));

    alert("¡Solicitud enviada con éxito! El administrador la revisará pronto.");
    window.location.href = "Becas.html";
});