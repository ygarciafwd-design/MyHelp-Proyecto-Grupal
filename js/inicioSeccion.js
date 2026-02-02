const nombreUsuario = document.getElementById("nombreUsuario")
// const usuarioCorreo = document.getElementById("usuarioCorreo")
// const usuarioPassword = document.getElementById("usuarioPassword") //VER SI SE PUEDE BORRAR MAS
const mostrarNombre = document.getElementById("mostrarNombre")


//
const inputCorreo = document.getElementById("inputCorreo")
const inputPassword = document.getElementById ("inputPassword")
const btnInicioUsuario = document.getElementById("btnInicioUsuario")

let usuariosList = JSON.parse(localStorage.getItem("keyUsuarios")) || [] //Llama el array 

btnInicioUsuario.addEventListener("click",function(e){ // ESA E en la funcion es para que no recarge
    e.preventDefault();

    // recarga.preventDefault(); // evita que la pagina se recargue

    if (inputPassword.value === "" || inputCorreo.value === ""){

        alert ("Estan vacios, deben llenar los demas") //CAMBIOS 
        return;
    }

    const CorreoDusuario = inputCorreo.value; 
    const PasswordDusuario = inputPassword.value;

    let usuarioValido = usuariosList.find(u => u.usuarioCorreo === CorreoDusuario);

    if (!usuarioValido) {
        alert ("No se encontro el Usuario mano")
        return; 
    }else if (usuarioValido.usuarioPassword !== PasswordDusuario){
        alert ("Contraseña Incorrecta")
        return
    }else{
        alert("Exitoso")
        window.location.href = "../Pages/usuarioIniciado.html";
    }




})
