// ELEMENTOS DEL HTML
const perfilNombre = document.getElementById("perfilNombre")
const perfilCorreo = document.getElementById("perfilCorreo")
const listaSolicitudes = document.getElementById("listaSolicitudes")

// 1. Verificar si hay alguien logueado
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

// Si NO hay usuario, lo mandamos al login INMEDIATAMENTE
if (!usuarioActivo) {
    alert("Debes iniciar sesión primero");
    window.location.href = "inicioSeccion.html"; 
} else {
    // Solo si existe el usuario, ejecutamos el resto del código
    cargarDatosPerfil();
}

function cargarDatosPerfil() {
    // Referencias a los elementos HTML
    const perfilNombre = document.getElementById("perfilNombre");
    const perfilCorreo = document.getElementById("perfilCorreo");
    const listaSolicitudes = document.getElementById("listaSolicitudes");

    // Llenar datos personales (usamos ?. para evitar errores si el elemento no existe)
    if (perfilNombre) perfilNombre.textContent = usuarioActivo.nombreUsuario;
    if (perfilCorreo) perfilCorreo.textContent = usuarioActivo.usuarioCorreo;

    // Cargar Solicitudes
    const todasLasSolicitudes = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    
    // Filtramos para ver solo las mías (coincidencia por correo)
    const misSolicitudes = todasLasSolicitudes.filter(s => s.correo === usuarioActivo.usuarioCorreo);

    if (listaSolicitudes) {
        listaSolicitudes.innerHTML = ""; // Limpiar lista
        
        if (misSolicitudes.length === 0) {
            listaSolicitudes.innerHTML = `<li class="list-group-item bg-transparent text-white-50">No tienes solicitudes aún.</li>`;
        } else {
            misSolicitudes.forEach(s => {
                const li = document.createElement("li");
                li.className = "list-group-item bg-transparent text-white d-flex justify-content-between align-items-center mb-2 border border-white-10 rounded";
                li.innerHTML = `
                    <div>
                        <span class="fw-bold d-block">${s.tipoBeca}</span>
                        <small class="text-white-50">${s.fecha || 'Fecha desconocida'}</small>
                    </div>
                    <span class="badge ${obtenerColorEstado(s.estado)}">${s.estado}</span>
                `;
                listaSolicitudes.appendChild(li);
            });
        }
    }
}

// Función auxiliar para colores
function obtenerColorEstado(estado) {
    if (estado === 'Aceptada') return 'bg-success';
    if (estado === 'Rechazada') return 'bg-danger';
    return 'bg-warning text-dark';
}

// Botón Cerrar Sesión
document.getElementById("btnCerrarSesion")?.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "inicioSeccion.html";
});