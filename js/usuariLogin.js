const nombreUsuario = document.getElementById("nombreUsuario")
const usuarioCorreo = document.getElementById("usuarioCorreo")
const usuarioPassword = document.getElementById("usuarioPassword")
const usuarioBtnGuardar = document.getElementById("usuarioBtnGuardar")
const mostrarNombre = document.getElementById("mostrarNombre")

let usuariosList = JSON.parse(localStorage.getItem("keyUsuarios")) || []

usuarioBtnGuardar.addEventListener("click", function () {

  if (nombreUsuario.value === "" || usuarioPassword.value === "" || usuarioCorreo.value === "") {
    alert("Están vacíos, deben llenar todos")
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

  usuarioNombre() // mostrar actualizados
})

function usuarioNombre() {
  mostrarNombre.innerHTML = ""

  usuariosList.forEach((usuario) => {
    const p = document.createElement("p")
    p.textContent = usuario.nombreUsuario
    mostrarNombre.appendChild(p)
  })
}

usuarioNombre() // mostrar al cargar la página







// function mostrarNmUsuario (){

//     usuarioNombre.innerHTML = ""

//     for (let index = 0; index< usuariosList.lenght; index++ ){ //
//         let h1 = document.createElement("h1")
//         h1.textContent = usuariosList[index]
//         usuarioNombre.appendChild(h1)

//     } //SI ESTA MAL ES AQUI


// }

// mostrarNmUsuario () //LA PARTE DE HTML TMB 

