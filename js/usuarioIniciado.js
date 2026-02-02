/**
 * ARCHIVO: usuarioIniciado.js
 * DESCRIPCIÓN: Maneja la captura de datos del formulario de becas, 
 * validación de campos y persistencia en LocalStorage.
 */

// 1. OBTENCIÓN DE REFERENCIAS A ELEMENTOS DEL DOM
// Seleccionamos todos los campos de entrada y el botón por sus IDs únicos.
const becaNombre = document.getElementById("becaNombre");
const becaApellido = document.getElementById("becaApellido");
const becaCedula = document.getElementById("becaCedula");
const becaCorreo = document.getElementById("becaCorreo");
const becaTelefono = document.getElementById("becaTelefono");
const becaDireccion = document.getElementById("becaDireccion");
const becaFechaNacimiento = document.getElementById("becaFechaNacimiento");
const becaTipo = document.getElementById("becaTipo");
const btnEnviarBeca = document.getElementById("btnEnviarBeca");
const listaMisSolicitudes = document.getElementById("listaMisSolicitudes");

/**
 * Función: mostrarMisSolicitudes
 * Descripción: Lee el array de solicitudes desde LocalStorage y las muestra en la interfaz del usuario.
 */
function mostrarMisSolicitudes() {
    // Limpiamos la lista visual antes de volver a llenarla.
    listaMisSolicitudes.innerHTML = "";

    // Obtenemos los datos actuales de LocalStorage (convertimos de string JSON a array).
    // Si no hay datos, iniciamos con un array vacío [].
    let solicitudesList = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];

    // Recorremos cada solicitud para crear un elemento de lista <li>.
    solicitudesList.forEach((solicitud) => {
        const li = document.createElement("li");
        li.textContent = `${solicitud.tipoBeca} - Estado: ${solicitud.estado}`;
        listaMisSolicitudes.appendChild(li);
    });
}

/**
 * Evento: Click en btnEnviarBeca
 * Descripción: Captura los datos, valida el correo y guarda la nueva solicitud.
 */
btnEnviarBeca.addEventListener("click", function () {
    // --- VALIDACIONES INICIALES ---

    // 1. Validar que los campos obligatorios no estén vacíos.
    if (becaNombre.value.trim() === "" || becaCedula.value.trim() === "" || becaCorreo.value.trim() === "") {
        alert("Por favor completa los campos principales (Nombre, Cédula y Correo).");
        return;
    }

    // 2. VALIDACIÓN DE CORREO: Debe contener un arroba '@'.
    // Usamos el método .includes() para verificar la presencia del carácter.
    if (!becaCorreo.value.includes("@")) {
        alert("El correo electrónico no es válido. Debe contener un '@'.");
        return;
    }

    // 3. NORMALIZACIÓN DE CORREO: Convertir a minúsculas (lowercase).
    // Esto asegura que 'CORREO@Gmail.Com' se guarde como 'correo@gmail.com'.
    const correoNormalizado = becaCorreo.value.toLowerCase();

    // --- CREACIÓN DEL OBJETO DE SOLICITUD ---
    const nuevaSolicitud = {
        id: Date.now(), // Generamos un ID único usando la marca de tiempo actual.
        nombre: becaNombre.value,
        apellido: becaApellido.value,
        cedula: becaCedula.value,
        correo: correoNormalizado, // Guardamos el correo ya validado y en minúsculas.
        telefono: becaTelefono.value,
        direccion: becaDireccion.value,
        fechaNacimiento: becaFechaNacimiento.value,
        tipoBeca: becaTipo.value,
        estado: "Pendiente" // Todas las solicitudes inician con estado "Pendiente".
    };

    // --- PERSISTENCIA EN LOCALSTORAGE ---
    // Obtenemos lo que ya existe.
    let solicitudesList = JSON.parse(localStorage.getItem("solicitudesBecas")) || [];
    // Agregamos la nueva solicitud al array.
    solicitudesList.push(nuevaSolicitud);
    // Guardamos el array actualizado (lo convertimos a string JSON).
    localStorage.setItem("solicitudesBecas", JSON.stringify(solicitudesList));

    // --- LIMPIEZA Y ACTUALIZACIÓN ---
    alert("Solicitud enviada correctamente.");
    limpiarCampos();
    mostrarMisSolicitudes();
});

/**
 * Función: limpiarCampos
 * Descripción: Reinicia los valores de los inputs del formulario.
 */
function limpiarCampos() {
    becaNombre.value = "";
    becaApellido.value = "";
    becaCedula.value = "";
    becaCorreo.value = "";
    becaTelefono.value = "";
    becaDireccion.value = "";
    becaFechaNacimiento.value = "";
}

// EJECUCIÓN INICIAL: Mostramos solicitudes previas al cargar la página.
mostrarMisSolicitudes();
