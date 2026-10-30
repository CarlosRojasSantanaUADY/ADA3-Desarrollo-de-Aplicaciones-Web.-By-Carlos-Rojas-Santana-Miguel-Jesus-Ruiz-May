document.addEventListener("DOMContentLoaded", () => {
    const contenedorFecha = document.getElementById("fecha-actual");
    
    if (contenedorFecha) {
        const fecha = new Date();
        
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        contenedorFecha.textContent = fecha.toLocaleDateString('es-MX', opciones);
    }
});
