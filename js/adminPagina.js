/**
 * ARCHIVO: adminPagina.js - Panel de administración completo con autenticación
 */

// Verificar autenticación al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (!isLoggedIn || isLoggedIn !== "true") {
        window.location.href = "AdminLogin.html";
        return;
    }

    cargarSolicitudes();
});

const tablaSolicitudes = document.getElementById("tablaSolicitudes");
const modalDetalles = document.getElementById("modalDetalles");
const contenidoDetalles = document.getElementById("contenidoDetalles");

// Función para cargar y pintar la tabla (Sin cambios en diseño/colores)
function cargarSolicitudes() {
    tablaSolicitudes.innerHTML = "";
    const solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];

    if (solicitudes.length === 0) {
        tablaSolicitudes.innerHTML = `<tr><td colspan="6" class="text-center text-white-50">No hay solicitudes registradas.</td></tr>`;
        document.getElementById('contadorSolicitudes').innerText = 0;
        return;
    }

    document.getElementById('contadorSolicitudes').innerText = solicitudes.length;

    solicitudes.forEach((s, index) => {
        const fila = document.createElement("tr");
        fila.className = "animate-fade-in";
        fila.innerHTML = `
            <td class="fw-bold">${s.nombre}</td>
            <td><span class="badge bg-light text-dark">${s.cedula || 'N/A'}</span></td>
            <td><span class="badge bg-info">${s.tipoBeca}</span></td>
            <td><span class="badge ${getBadgeColor(s.estado)}">${s.estado}</span></td>
            <td>${s.fecha || 'Reciente'}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-info me-1" onclick="verDetalles(${index})" title="Ver detalles">👁️</button>
                <button class="btn btn-sm btn-success me-1" onclick="aprobarSolicitud(${index})" title="Aprobar">✓</button>
                <button class="btn btn-sm btn-warning me-1" onclick="rechazarSolicitud(${index})" title="Rechazar">✗</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarSolicitud(${index})" title="Eliminar">🗑️</button>
            </td>
        `;
        tablaSolicitudes.appendChild(fila);
    });
}

// Colores según el estado
function getBadgeColor(estado) {
    switch (estado) {
        case 'Aceptada': return 'bg-success';
        case 'Rechazada': return 'bg-danger';
        default: return 'bg-warning text-dark';
    }
}

// Ver detalles completos en el modal
window.verDetalles = function (index) {
    const solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    const s = solicitudes[index];

    let camposEspecificos = '';

    // Mostrar campos específicos según el tipo de beca
    if (s.tipoBeca === "Deportiva") {
        camposEspecificos = `
            <div class="col-12"><hr class="my-3"></div>
            <div class="col-12"><h5 class="fw-bold text-primary">📋 Información Deportiva</h5></div>
            <div class="col-6 mb-3"><strong>Deporte:</strong><br>${s.deporte || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Edad:</strong><br>${s.edad || 'N/A'} años</div>
            <div class="col-6 mb-3"><strong>Experiencia:</strong><br>${s.experiencia || 'N/A'} años</div>
            <div class="col-6 mb-3"><strong>Nivel Competitivo:</strong><br>${s.nivelCompetitivo || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Horas de Entrenamiento:</strong><br>${s.horasEntrenamiento || 'N/A'} hrs/semana</div>
            <div class="col-12 mb-3"><strong>Logros:</strong><br>${s.logros || 'N/A'}</div>
        `;
    } else if (s.tipoBeca === "Socioeconómica") {
        camposEspecificos = `
            <div class="col-12"><hr class="my-3"></div>
            <div class="col-12"><h5 class="fw-bold text-primary">💰 Información Socioeconómica</h5></div>
            <div class="col-6 mb-3"><strong>Ingresos Mensuales:</strong><br>₡${s.ingresos || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Personas en el Hogar:</strong><br>${s.personas || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Situación Laboral:</strong><br>${s.situacionLaboral || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Tipo de Vivienda:</strong><br>${s.tipoVivienda || 'N/A'}</div>
            <div class="col-12 mb-3"><strong>Gastos Mensuales:</strong><br>₡${s.gastosMensuales || 'N/A'}</div>
        `;
    } else if (s.tipoBeca === "Académica" || s.tipoBeca === "Excelencia Académica") {
        camposEspecificos = `
            <div class="col-12"><hr class="my-3"></div>
            <div class="col-12"><h5 class="fw-bold text-primary">📚 Información Académica</h5></div>
            <div class="col-6 mb-3"><strong>Promedio:</strong><br>${s.promedio || 'N/A'}/100</div>
            <div class="col-6 mb-3"><strong>Año Académico:</strong><br>${s.anoAcademico || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Institución:</strong><br>${s.institucion || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Área de Interés:</strong><br>${s.areaInteres || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Horas de Estudio:</strong><br>${s.horasEstudio || 'N/A'} hrs/semana</div>
            <div class="col-12 mb-3"><strong>Actividades Extracurriculares:</strong><br>${s.actividadesExtra || 'N/A'}</div>
        `;
    }

    contenidoDetalles.innerHTML = `
        <div class="row text-dark">
            <div class="col-12"><h5 class="fw-bold text-primary">👤 Información General</h5></div>
            <div class="col-6 mb-3"><strong>Nombre:</strong><br>${s.nombre}</div>
            <div class="col-6 mb-3"><strong>Cédula:</strong><br>${s.cedula || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Correo:</strong><br>${s.correo || 'N/A'}</div>
            <div class="col-6 mb-3"><strong>Tipo de Beca:</strong><br><span class="badge bg-info">${s.tipoBeca}</span></div>
            <div class="col-6 mb-3"><strong>Estado:</strong><br><span class="badge ${getBadgeColor(s.estado)}">${s.estado}</span></div>
            <div class="col-6 mb-3"><strong>Fecha:</strong><br>${s.fecha || 'Reciente'}</div>
            ${camposEspecificos}
        </div>
    `;
    document.getElementById('modalDetalles').style.display = 'block';
};

// Aprobar solicitud
window.aprobarSolicitud = function (index) {
    Swal.fire({
        title: '¿Aprobar solicitud?',
        text: 'La solicitud será marcada como Aceptada',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, aprobar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
            solicitudes[index].estado = "Aceptada";
            localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudes));

            Swal.fire({
                icon: 'success',
                title: '¡Aprobada!',
                text: 'La solicitud ha sido aprobada exitosamente',
                confirmButtonColor: '#3085d6'
            });
            cargarSolicitudes();
        }
    });
};

// Rechazar solicitud
window.rechazarSolicitud = function (index) {
    Swal.fire({
        title: '¿Rechazar solicitud?',
        text: 'La solicitud será marcada como Rechazada',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, rechazar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
            solicitudes[index].estado = "Rechazada";
            localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudes));

            Swal.fire({
                icon: 'success',
                title: 'Rechazada',
                text: 'La solicitud ha sido rechazada',
                confirmButtonColor: '#3085d6'
            });
            cargarSolicitudes();
        }
    });
};

// Eliminar solicitud
window.eliminarSolicitud = function (index) {
    Swal.fire({
        title: '¿Eliminar solicitud?',
        text: 'Esta acción no se puede deshacer',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
            solicitudes.splice(index, 1);
            localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudes));

            Swal.fire({
                icon: 'success',
                title: 'Eliminada',
                text: 'La solicitud ha sido eliminada',
                confirmButtonColor: '#3085d6'
            });
            cargarSolicitudes();
        }
    });
};

// Cerrar sesión
document.querySelector('.btn-logout')?.addEventListener('click', (e) => {
    e.preventDefault();

    Swal.fire({
        title: '¿Cerrar sesión?',
        text: 'Tendrás que iniciar sesión nuevamente',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("adminLoggedIn");
            localStorage.removeItem("adminLoginTime");
            window.location.href = "AdminLogin.html";
        }
    });
});

// Cerrar modales al hacer clic fuera
window.onclick = function (event) {
    if (event.target == modalDetalles) modalDetalles.style.display = "none";
};

// Cerrar modal con botón X
document.getElementById('btnCerrarModal')?.addEventListener('click', () => {
    modalDetalles.style.display = "none";
});