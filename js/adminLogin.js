/**
 * ARCHIVO: adminLogin.js - Sistema de autenticación para administrador
 */

// Credenciales por defecto (en producción deberían estar en un servidor)
const ADMIN_CREDENTIALS = {
    usuario: "admin",
    contrasena: "admin123"
};

document.getElementById("formLoginAdmin")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    // Validar credenciales
    if (usuario === ADMIN_CREDENTIALS.usuario && contrasena === ADMIN_CREDENTIALS.contrasena) {
        // Guardar sesión en localStorage
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminLoginTime", Date.now());

        Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Acceso concedido',
            confirmButtonColor: '#3085d6',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "AdminHome.html";
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'Usuario o contraseña incorrectos',
            confirmButtonColor: '#3085d6'
        });
    }
});
