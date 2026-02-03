const nombreUsuario = document.getElementById("nombreUsuario")
// const usuarioCorreo = document.getElementById("usuarioCorreo")
// const usuarioPassword = document.getElementById("usuarioPassword") //VER SI SE PUEDE BORRAR MAS
const mostrarNombre = document.getElementById("mostrarNombre")


//
const inputCorreo = document.getElementById("inputCorreo")
const inputPassword = document.getElementById("inputPassword")
const btnInicioUsuario = document.getElementById("btnInicioUsuario")

// Base de datos de usuarios registrados
let usuariosList = JSON.parse(localStorage.getItem("keyUsuarios")) || []

btnInicioUsuario.addEventListener("click", function (e) {
    e.preventDefault()

    // 1. Validar campos vacíos
    if (inputPassword.value === "" || inputCorreo.value === "") {
        Swal.fire({ icon: "warning", title: "Campos vacíos", text: "Llena todo por favor" })
        return
    }

    // 2. Buscar usuario
    const usuarioValido = usuariosList.find(u => u.usuarioCorreo === inputCorreo.value)

    if (!usuarioValido) {
        Swal.fire({ icon: "error", title: "Error", text: "Usuario no encontrado" })
        return
    }

    // 3. Validar contraseña
    if (usuarioValido.usuarioPassword !== inputPassword.value) {
        Swal.fire({ icon: "error", title: "Error", text: "Contraseña incorrecta" })
        return
    }

    // 4. ¡ÉXITO! -> GUARDAR SESIÓN (Esto es lo vital para que no te de error después)
    // Guardamos al usuario actual en una 'caja' separada llamada usuarioActivo
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));

    Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        // Redirigir al Home o al Perfil
        window.location.href = "home.html"; 
    });
})

