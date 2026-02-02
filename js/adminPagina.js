/**
 * ARCHIVO: adminPagina.js
 * DESCRIPCIÓN: Gestiona el panel de administración para visualizar, 
 * detallar, aceptar o rechazar solicitudes de becas almacenadas en LocalStorage.
 */

// SELECTORES DE ELEMENTOS DEL DOM
const tablaSolicitudes = document.getElementById("tablaSolicitudes"); // El cuerpo de la tabla para insertar filas.
const modalDetalles = document.getElementById("modalDetalles");       // El contenedor del modal (ventana emergente).
const contenidoDetalles = document.getElementById("contenidoDetalles"); // El div donde inyectaremos la info del modal.
const btnCerrarModal = document.getElementById("btnCerrarModal");     // El botón 'X' para cerrar el modal.

/**
 * Función: cargarSolicitudes
 * Descripción: Obtiene el array de solicitudes desde LocalStorage y genera dinámicamente las filas de la tabla.
 */
function cargarSolicitudes() {
    // Limpiar la tabla antes de renderizar para evitar duplicados.
    tablaSolicitudes.innerHTML = "";

    // Recuperar datos de LocalStorage o usar array vacío si no hay nada.
    const solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];

    // Recorrer el array y crear una fila (TR) por cada solicitud.
    solicitudes.forEach((solicitud, index) => {
        const fila = document.createElement("tr");

        // Inyectamos el HTML de la celda. Usamos index para saber qué solicitud estamos operando.
        fila.innerHTML = `
            <td>${solicitud.nombre} ${solicitud.apellido}</td>
            <td>${solicitud.cedula}</td>
            <td>${solicitud.tipoBeca}</td>
            <td style="font-weight: bold; color: ${getColor(solicitud.estado)}">${solicitud.estado}</td>
            <td>
                <!-- Acciones: Ver detalles (index), Aceptar (index) o Rechazar (index) -->
                <button class="btn-detalles" onclick="verDetalles(${index})">Ver detalles</button>
                <button class="btn-aceptar" onclick="cambiarEstado(${index}, 'Aceptada')">Aceptar</button>
                <button class="btn-rechazar" onclick="cambiarEstado(${index}, 'Rechazada')">Rechazar</button>
            </td>
        `;
        tablaSolicitudes.appendChild(fila);
    });
}

/**
 * Función: verDetalles
 * Descripción: Abre el modal y muestra TODA la información del objeto solicitud seleccionado.
 * @param {number} index - La posición de la solicitud en el array original.
 */
window.verDetalles = function (index) {
    const solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    const s = solicitudes[index];

    // Construimos la lista de detalles completa que el admin solicitó ver.
    contenidoDetalles.innerHTML = `
        <p><strong>Nombre completo:</strong> ${s.nombre} ${s.apellido}</p>
        <p><strong>Cédula:</strong> ${s.cedula}</p>
        <p><strong>Correo:</strong> ${s.correo}</p>
        <p><strong>Teléfono:</strong> ${s.telefono}</p>
        <p><strong>Dirección:</strong> ${s.direccion}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${s.fechaNacimiento}</p>
        <p><strong>Tipo de Beca:</strong> ${s.tipoBeca}</p>
        <p><strong>Estado Actual:</strong> ${s.estado}</p>
    `;

    // Mostramos el modal cambiando el estilo display.
    modalDetalles.style.display = "block";
};

/**
 * Función: cambiarEstado
 * Descripción: Actualiza el campo "estado" de una solicitud específica en LocalStorage.
 * @param {number} index - Posición en el array.
 * @param {string} nuevoEstado - 'Aceptada' o 'Rechazada'.
 */
window.cambiarEstado = function (index, nuevoEstado) {
    let solicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];

    // Actualizamos el valor del estado en el objeto seleccionado.
    solicitudes[index].estado = nuevoEstado;

    // Convertimos de nuevo a String JSON para guardar los cambios persistentes.
    localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudes));

    // Refrescamos la tabla para ver el cambio de inmediato.
    cargarSolicitudes();
};

// GESTIÓN DEL CIERRE DEL MODAL
// 1. Cerrar al pulsar la 'X'.
btnCerrarModal.onclick = () => modalDetalles.style.display = "none";
// 2. Cerrar al pulsar fuera del cuadro blanco (sobre el fondo oscuro).
window.onclick = (event) => {
    if (event.target == modalDetalles) modalDetalles.style.display = "none";
};

/**
 * Función Auxiliar: getColor
 * Descripción: Devuelve el color correspondiente según el estado de la solicitud.
 */
function getColor(estado) {
    if (estado === "Aceptada") return "green";
    if (estado === "Rechazada") return "red";
    return "orange"; // Para estado 'Pendiente'
}

// ARRANQUE INCIAL: Cargar datos al entrar a la página.
cargarSolicitudes();
