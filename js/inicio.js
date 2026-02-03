document.addEventListener("DOMContentLoaded", () => {

    const usuario = localStorage.getItem("usuario");

    const loginItem = document.getElementById("loginItem");
    const menuUsuario = document.getElementById("menuUsuario");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const cerrarSesion = document.getElementById("cerrarSesion");

    // SI HAY USUARIO LOGUEADO
    if (usuario) {
        loginItem.classList.add("d-none");     // Oculta "Inicio sesión"
        menuUsuario.classList.remove("d-none"); // Muestra menú
        nombreUsuario.textContent = usuario;   // Muestra nombre
    }

    // BOTÓN CERRAR SESIÓN
    cerrarSesion?.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        location.reload();
    });

});
