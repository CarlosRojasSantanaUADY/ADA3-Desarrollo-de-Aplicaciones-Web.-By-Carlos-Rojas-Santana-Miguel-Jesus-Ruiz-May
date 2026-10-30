document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-registro");

    if (!formulario) return;

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        limpiarErrores();

        let formularioValido = true;

        // VALIDACION DEL NOMBRE 
        const nombreInput = document.getElementById("nombre");
        const nombreValor = nombreInput.value.trim();
        if (nombreValor === "") {
            mostrarError(nombreInput, "error-nombre", "El campo Nombre Completo es obligatorio.");
            formularioValido = false;
        } else if (nombreValor.length < 3) {
            mostrarError(nombreInput, "error-nombre", "El nombre debe contener al menos 3 caracteres.");
            formularioValido = false;
        } else {
            marcarValido(nombreInput);
        }

        // VALIDACION DEL EMAIL
        const emailInput = document.getElementById("email");
        const emailValor = emailInput.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValor === "") {
            mostrarError(emailInput, "error-email", "El correo electronico es mandatorio.");
            formularioValido = false;
        } else if (!regexEmail.test(emailValor)) {
            mostrarError(emailInput, "error-email", "El formato de correo ingresado no es valido (Ej: usuario@dominio.com).");
            formularioValido = false;
        } else {
            marcarValido(emailInput);
        }

        // VALIDACION PERFIL
        const perfilSelect = document.getElementById("perfil");
        if (perfilSelect.value === "") {
            mostrarError(perfilSelect, "error-perfil", "Debe seleccionar un perfil jerarquico de acceso.");
            formularioValido = false;
        } else {
            marcarValido(perfilSelect);
        }

        // VALIDACION RADIO
        const radiosNotificaciones = document.getElementsByName("notificaciones");
        let radioSeleccionado = false;
        for (const radio of radiosNotificaciones) {
            if (radio.checked) {
                radioSeleccionado = true;
                break;
            }
        }
        if (!radioSeleccionado) {
            const contenedorRadio = radiosNotificaciones[0].closest(".mb-3");
            mostrarError(null, "error-notificaciones", "Seleccione una frecuencia para las alertas informativas.");
            formularioValido = false;
        } else {
            document.getElementById("error-notificaciones").textContent = "";
        }

        // VALIDACION DEl CHECKBOX
        const terminosCheckbox = document.getElementById("terminos");
        if (!terminosCheckbox.checked) {
            mostrarError(terminosCheckbox, "error-terminos", "Debe aceptar obligatoriamente los terminos legales para continuar.");
            formularioValido = false;
        } else {
            marcarValido(terminosCheckbox);
        }

        // ENVIO DATOS
        const mensajeGlobal = document.getElementById("mensaje-global");
        if (formularioValido) {
            mensajeGlobal.className = "alert alert-success";
            mensajeGlobal.textContent = "Formulario validado con exito! Los datos estan listos para enviarse a la base de datos.";
            
        } else {
            mensajeGlobal.className = "alert alert-danger";
            mensajeGlobal.textContent = "No se pudo procesar el formulario. Por favor, corrija los campos marcados en rojo.";
        }
    });

    function mostrarError(inputElement, idErrorDiv, textoMensaje) {
        if (inputElement) inputElement.classList.add("is-invalid");
        document.getElementById(idErrorDiv).textContent = textoMensaje;
    }

    function marcarValido(inputElement) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
    }

    function limpiarErrores() {
        const inputs = formulario.querySelectorAll(".form-control, .form-select, .form-check-input");
        inputs.forEach(input => {
            input.classList.remove("is-invalid", "is-valid");
        });
        const divsError = formulario.querySelectorAll("[id^='error-']");
        divsError.forEach(div => div.textContent = "");
        
        const mensajeGlobal = document.getElementById("mensaje-global");
        mensajeGlobal.className = "alert alert-danger d-none";
    }
});
