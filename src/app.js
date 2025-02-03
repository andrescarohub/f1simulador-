console.log("Proyecto Simulador de Carreras Iniciado...");

// Importar componentes (cuando estén listos)
import "./components/circuit.js";


document.addEventListener("DOMContentLoaded", () => {
    const btnEmpezar = document.getElementById("btn-empezar");
    const menuPrincipal = document.getElementById("menu-principal");
    
    btnEmpezar.addEventListener("click", () => {
        btnEmpezar.classList.add("d-none"); // Oculta el botón de empezar
        menuPrincipal.classList.remove("d-none"); // Muestra el menú
    });
});