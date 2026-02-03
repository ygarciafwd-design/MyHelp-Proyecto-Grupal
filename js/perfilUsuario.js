// ELEMENTOS DEL HTML
const perfilNombre = document.getElementById("perfilNombre")
const perfilCorreo = document.getElementById("perfilCorreo")
const listaSolicitudes = document.getElementById("listaSolicitudes")

// OBTENER USUARIO QUE INICIÓ SESIÓN
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))

const navbarNombreUsuario = document.getElementById("navbarNombreUsuario")

if (!usuarioActivo) {
    window.location.href = "../Pages/login.html"
}

// Mostrar nombre en navbar
navbarNombreUsuario.textContent = usuarioActivo.nombreUsuario


// SI NO HAY USUARIO LOGUEADO, REDIRIGE AL LOGIN
if (!usuarioActivo) {
    window.location.href = "../Pages/login.html"
}

// MOSTRAR DATOS DEL PERFIL
perfilNombre.textContent = usuarioActivo.nombreUsuario
perfilCorreo.textContent = usuarioActivo.usuarioCorreo

// OBTENER SOLICITUDES DE BECAS
let solicitudesBecas = JSON.parse(localStorage.getItem("solicitudesBecas")) || []

// FILTRAR SOLO LAS DEL USUARIO ACTUAL
const solicitudesUsuario = solicitudesBecas.filter(
    solicitud => solicitud.correo === usuarioActivo.usuarioCorreo
)

// MOSTRAR SOLICITUDES
if (solicitudesUsuario.length === 0) {
    listaSolicitudes.innerHTML = "<li>No has solicitado ninguna beca</li>"
} else {
    solicitudesUsuario.forEach(solicitud => {
        const li = document.createElement("li")
        li.textContent = `${solicitud.beca} - Estado: ${solicitud.estado}`
        listaSolicitudes.appendChild(li)
    })
}


const btnCerrarSesion = document.getElementById("btnCerrarSesion")

btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo")

    Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has salido correctamente",
        timer: 1500,
        showConfirmButton: false
    }).then(() => {
        window.location.href = "../Pages/login.html"
    })
})
