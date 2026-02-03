const nombreUsuario = document.getElementById("nombreUsuario")
// const usuarioCorreo = document.getElementById("usuarioCorreo")
// const usuarioPassword = document.getElementById("usuarioPassword") //VER SI SE PUEDE BORRAR MAS
const mostrarNombre = document.getElementById("mostrarNombre")


//
const inputCorreo = document.getElementById("inputCorreo")
const inputPassword = document.getElementById("inputPassword")
const btnInicioUsuario = document.getElementById("btnInicioUsuario")

let usuariosList = JSON.parse(localStorage.getItem("keyUsuarios")) || []

btnInicioUsuario.addEventListener("click", function (e) {
    e.preventDefault()

    if (inputPassword.value === "" || inputCorreo.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Campos vacíos",
            text: "Debes llenar el correo y la contraseña"
        })
        return
    }

    const CorreoDusuario = inputCorreo.value
    const PasswordDusuario = inputPassword.value

    let usuarioValido = usuariosList.find(
        u => u.usuarioCorreo === CorreoDusuario
    )

    if (!usuarioValido) {
        Swal.fire({
            icon: "error",
            title: "Usuario no encontrado",
            text: "El correo ingresado no está registrado"
        })
        return
    }
    else if (usuarioValido.usuarioPassword !== PasswordDusuario) {
        Swal.fire({
            icon: "error",
            title: "Contraseña incorrecta",
            text: "La contraseña ingresada no es válida"
        })
        return
    }
    else {
        Swal.fire({
            icon: "success",
            title: "Inicio de sesión exitoso",
            text: "Bienvenido 👋",
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "../Pages/usuarioIniciado.html"
        })
    }
})

