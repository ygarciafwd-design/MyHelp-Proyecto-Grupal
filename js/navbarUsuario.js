document.addEventListener("DOMContentLoaded", () => {

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))

    const loginItem = document.getElementById("loginItem")
    const menuUsuario = document.getElementById("menuUsuario")
    const nombreNavbar = document.getElementById("nombreNavbar")
    const btnCerrarSesion = document.getElementById("btnCerrarSesion")

    // SI HAY USUARIO LOGUEADO
    if (usuarioActivo) {
        loginItem.classList.add("d-none")       // Oculta "Inicio sesión"
        menuUsuario.classList.remove("d-none")  // Muestra menú usuario
        nombreNavbar.textContent = usuarioActivo.nombreUsuario
    }

    // CERRAR SESIÓN
    btnCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo")
        window.location.href = "inicioSeccion.html"
    })

})
