const API_URL = "http://localhost:3000/pilotos";
const galeriaPilotos = document.getElementById("galeria-pilotos");

// Cargar pilotos desde JSON Server
async function cargarPilotos() {
    try {
        const response = await fetch(API_URL);
        const pilotos = await response.json();
        pilotos.forEach(({ id, nombre, equipo, nacionalidad, experiencia, habilidades, imagen }) => {
            agregarPiloto(id, nombre, equipo, nacionalidad, experiencia, habilidades, imagen);
        });
    } catch (error) {
        console.error("Error cargando pilotos:", error);
    }
}

// Función para agregar un piloto a la galería
function agregarPiloto(id, nombre, equipo, nacionalidad, experiencia, habilidades, imagen) {
    const piloto = document.createElement("piloto-component");
    piloto.setAttribute("id", id);
    piloto.setAttribute("nombre", nombre);
    piloto.setAttribute("equipo", equipo);
    piloto.setAttribute("nacionalidad", nacionalidad);
    piloto.setAttribute("experiencia", experiencia);
    piloto.setAttribute("habilidades", habilidades.join(", "));
    piloto.setAttribute("imagen", imagen);
    galeriaPilotos.appendChild(piloto);
}

document.addEventListener("DOMContentLoaded", cargarPilotos);
