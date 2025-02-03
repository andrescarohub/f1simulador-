const API_URL = "http://localhost:3000/circuitos";

const galeriaCircuitos = document.getElementById("galeria-circuitos");

// Cargar circuitos desde JSON Server
async function cargarCircuitos() {
    try {
        const response = await fetch(API_URL);
        const circuitos = await response.json();
        circuitos.forEach(({ id, nombre, ubicacion, distancia, condiciones }) => {
            agregarCircuito(id, nombre, ubicacion, distancia, condiciones);
        });
    } catch (error) {
        console.error("Error cargando circuitos:", error);
    }
}

// Función para agregar un circuito a la galería
function agregarCircuito(id, nombre, ubicacion, distancia, condiciones) {
    const circuito = document.createElement("circuito-component");
    circuito.setAttribute("id", id);
    circuito.setAttribute("nombre", nombre);
    circuito.setAttribute("ubicacion", ubicacion);
    circuito.setAttribute("distancia", distancia);
    circuito.setAttribute("condiciones", condiciones);
    galeriaCircuitos.appendChild(circuito);
}

document.addEventListener("DOMContentLoaded", cargarCircuitos);
