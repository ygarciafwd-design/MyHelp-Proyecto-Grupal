/**
 * ARCHIVO: adminPagina.js - Versión Optimizada con Edición
 */

const tablaSolicitudes = document.getElementById("tablaSolicitudes");
const modalDetalles = document.getElementById("modalDetalles");
const contenidoDetalles = document.getElementById("contenidoDetalles");

// Función para cargar y pintar la tabla (Sin cambios en diseño/colores)
function cargarSolicitudes() {
    tablaSolicitudes.innerHTML = "";
    const solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];

    if (solicitudes.length === 0) {
        tablaSolicitudes.innerHTML = `<tr><td colspan="5" class="text-center text-white-50">No hay solicitudes registradas.</td></tr>`;
        return;
    }

    solicitudes.forEach((s, index) => {
        const fila = document.createElement("tr");
        fila.className = "animate-fade-in";
        fila.innerHTML = `
            <td class="fw-bold">${s.nombre} ${s.apellido || ''}</td>
            <td><span class="badge bg-light text-dark">${s.tipoBeca}</span></td>
            <td><span class="badge ${getBadgeColor(s.estado)}">${s.estado}</span></td>
            <td>${s.fecha || 'Reciente'}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-info me-1" onclick="verDetalles(${index})">Ver</button>
                <button class="btn btn-sm btn-warning me-1" onclick="abrirEditor(${index})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarSolicitud(${index})">Eliminar</button>
            </td>
        `;
        tablaSolicitudes.appendChild(fila);
    });
}

// Colores según el estado (Se mantiene tu lógica original)
function getBadgeColor(estado) {
    switch (estado) {
        case 'Aceptada': return 'bg-success';
        case 'Rechazada': return 'bg-danger';
        default: return 'bg-warning text-dark';
    }
}

// Ver detalles en el modal
window.verDetalles = function(index) {
    const solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    const s = solicitudes[index];
    
    contenidoDetalles.innerHTML = `
        <div class="row text-dark">
            <div class="col-6 mb-3"><strong>Nombre:</strong><br>${s.nombre}</div>
            <div class="col-6 mb-3"><strong>Beca:</strong><br>${s.tipoBeca}</div>
            <div class="col-6 mb-3"><strong>Correo:</strong><br>${s.correo || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Estado:</strong><br>${s.estado}</div>
            <div class="col-12"><strong>Detalles Extra:</strong><br>${s.datoExtra || 'Ninguno'}</div>
        </div>
    `;
    document.getElementById('modalDetalles').style.display = 'block';
};

// --- NUEVA LÓGICA DE EDICIÓN (Conectada a AdminHome.html) ---

window.abrirEditor = function(index) {
    const solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    const s = solicitudes[index];
    
    // Carga los datos en los IDs que ya tienes en el HTML
    document.getElementById('editIndex').value = index;
    document.getElementById('editNombre').value = s.nombre;
    document.getElementById('editTipoBeca').value = s.tipoBeca;
    document.getElementById('editEstado').value = s.estado;
    
    document.getElementById('modalEditar').style.display = 'block';
};

window.cerrarModalEditar = function() {
    document.getElementById('modalEditar').style.display = 'none';
};

// Escuchador para procesar el formulario de edición
document.getElementById('formEditar')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const index = document.getElementById('editIndex').value;
    let solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    
    // Actualiza los valores respetando la estructura
    solicitudes[index].nombre = document.getElementById('editNombre').value;
    solicitudes[index].tipoBeca = document.getElementById('editTipoBeca').value;
    solicitudes[index].estado = document.getElementById('editEstado').value;
    
    localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudes));
    cerrarModalEditar();
    cargarSolicitudes();
});

// Eliminar solicitud
window.eliminarSolicitud = function(index) {
    if (confirm("¿Seguro que quieres borrar esta solicitud?")) {
        let solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
        solicitudes.splice(index, 1);
        localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudes));
        cargarSolicitudes();
    }
};

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    if (event.target == modalDetalles) modalDetalles.style.display = "none";
    if (event.target == document.getElementById('modalEditar')) cerrarModalEditar();
};

// Inicializar
document.addEventListener("DOMContentLoaded", cargarSolicitudes);