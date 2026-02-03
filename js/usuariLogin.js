const nombreUsuario = document.getElementById("nombreUsuario")
const usuarioCorreo = document.getElementById("usuarioCorreo")
const usuarioPassword = document.getElementById("usuarioPassword")
const usuarioBtnGuardar = document.getElementById("usuarioBtnGuardar")
const mostrarNombre = document.getElementById("mostrarNombre")

let usuariosList = JSON.parse(localStorage.getItem("keyUsuarios")) || []

usuarioBtnGuardar.addEventListener("click", function (event) {
  event.preventDefault() // ← IMPORTANTE para que el botón funcione bien

  if (nombreUsuario.value === "" || usuarioPassword.value === "" || usuarioCorreo.value === "") {
    Swal.fire({
      icon: "warning",
      title: "Campos vacíos",
      text: "Debes llenar todos los espacios"
    })
    return
  }

  // 🔹 VALIDACIÓN DEL @
  if (!usuarioCorreo.value.includes("@")) {
    Swal.fire({
      icon: "error",
      title: "Correo inválido",
      text: "El correo debe contener un @"
    })
    return
  }

  // 🔹 VALIDACIÓN DE CONTRASEÑA DÉBIL
  if (usuarioPassword.value.length < 6) {
    Swal.fire({
      icon: "info",
      title: "Contraseña muy débil",
      text: "La contraseña debe tener al menos 6 caracteres"
    })
    return
  }

  const usuario = {
    nombreUsuario: nombreUsuario.value,
    usuarioCorreo: usuarioCorreo.value,
    usuarioPassword: usuarioPassword.value
  }

  usuariosList.push(usuario)
  localStorage.setItem("keyUsuarios", JSON.stringify(usuariosList))

  nombreUsuario.value = ""
  usuarioCorreo.value = ""
  usuarioPassword.value = ""

  usuarioNombre()
})

function usuarioNombre() {
  mostrarNombre.innerHTML = ""

  usuariosList.forEach((usuario) => {
    const p = document.createElement("p")
    p.textContent = usuario.nombreUsuario
    mostrarNombre.appendChild(p)
  })
}

usuarioNombre()








// function mostrarNmUsuario (){

//     usuarioNombre.innerHTML = ""

//     for (let index = 0; index< usuariosList.lenght; index++ ){ //
//         let h1 = document.createElement("h1")
//         h1.textContent = usuariosList[index]
//         usuarioNombre.appendChild(h1)

//     } //SI ESTA MAL ES AQUI


// }

// mostrarNmUsuario () //LA PARTE DE HTML TMB 

