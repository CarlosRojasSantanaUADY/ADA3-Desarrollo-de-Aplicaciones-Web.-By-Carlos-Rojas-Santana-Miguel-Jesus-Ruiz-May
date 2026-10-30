const pantalla = document.getElementById("pantalla-calculadora");

function agregarAPantalla(valor) {
    if (pantalla.value === "0" && valor !== ".") {
        pantalla.value = valor;
    } else {
        pantalla.value += valor;
    }
}

function limpiarPantalla() {
    pantalla.value = "";
}

function calcularResultado() {
    try {
        if (pantalla.value.trim() !== "") {
            pantalla.value = Function(`"use strict"; return (${pantalla.value})`)();
        }
    } catch (error) {
        pantalla.value = "Error";
        setTimeout(limpiarPantalla, 1500);
    }
}
