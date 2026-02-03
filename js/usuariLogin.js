const nombreUsuario = document.getElementById("nombreUsuario")
const usuarioCorreo = document.getElementById("usuarioCorreo")
const usuarioPassword = document.getElementById("usuarioPassword")
const usuarioBtnGuardar = document.getElementById("usuarioBtnGuardar")

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

  // ✅ CONFIRMACIÓN DE REGISTRO Y REDIRECCIÓN
  Swal.fire({
    icon: "success",
    title: "Registro exitoso",
    text: "Tu cuenta fue creada correctamente. Serás redirigido al formulario de becas.",
    timer: 2000,
    showConfirmButton: false
  }).then(() => {
    // Guardar sesión del usuario recién registrado
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    // Redirigir al formulario de becas
    window.location.href = "Becas.html";
  })
})
