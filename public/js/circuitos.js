class CircuitoComponent extends HTMLElement {
    constructor() {
        super();

        // Crear shadow DOM para encapsular estilos y evitar conflictos
        this.attachShadow({ mode: "open" });

        // Estructura del componente
        this.shadowRoot.innerHTML = `
            <style>
                .circuito-card {
                    border: 2px solid #ff0000;
                    padding: 10px;
                    border-radius: 10px;
                    text-align: center;
                    background-color: #222;
                    color: white;
                    width: 200px;
                    margin: 10px;
                }
                .circuito-card img {
                    width: 100%;
                    border-radius: 10px;
                }
                .botones {
                    margin-top: 10px;
                }
                .btn {
                    background-color: black;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    margin: 3px;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .btn:hover {
                    background-color: #444;
                }
            </style>
            <div class="circuito-card">
                <img src="assets/pista.png" alt="Circuito">
                <h3 id="nombre"></h3>
                <p id="ubicacion"></p>
                <p id="distancia"></p>
                <p id="condiciones"></p>
                <div class="botones">
                    <button class="btn editar">Editar</button>
                    <button class="btn eliminar">Eliminar</button>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector("#nombre").textContent = this.getAttribute("nombre");
        this.shadowRoot.querySelector("#ubicacion").textContent = `Ubicación: ${this.getAttribute("ubicacion")}`;
        this.shadowRoot.querySelector("#distancia").textContent = `Distancia: ${this.getAttribute("distancia")}`;
        this.shadowRoot.querySelector("#condiciones").textContent = `Condiciones: ${this.getAttribute("condiciones")}`;

        // Eventos para editar y eliminar
        this.shadowRoot.querySelector(".eliminar").addEventListener("click", () => {
            this.remove();
            eliminarCircuito(this.getAttribute("nombre"));
        });

        this.shadowRoot.querySelector(".editar").addEventListener("click", () => {
            cargarEdicionCircuito(this);
        });
    }
    
}
const galeriaCircuitos = document.getElementById("galeria-circuitos");

// Función para agregar un circuito
function agregarCircuito(nombre, ubicacion, distancia, condiciones) {
    const circuito = document.createElement("circuito-component");
    circuito.setAttribute("nombre", nombre);
    circuito.setAttribute("ubicacion", ubicacion);
    circuito.setAttribute("distancia", distancia);
    circuito.setAttribute("condiciones", condiciones);
    galeriaCircuitos.appendChild(circuito);

    guardarCircuitoLocal(nombre, ubicacion, distancia, condiciones);
}

// Función para eliminar un circuito del almacenamiento
function eliminarCircuito(nombre) {
    let circuitos = JSON.parse(localStorage.getItem("circuitos")) || [];
    circuitos = circuitos.filter(circuito => circuito.nombre !== nombre);
    localStorage.setItem("circuitos", JSON.stringify(circuitos));
}

// Función para cargar la lista de circuitos guardados
function cargarCircuitos() {
    let circuitos = JSON.parse(localStorage.getItem("circuitos")) || [];
    circuitos.forEach(({ nombre, ubicacion, distancia, condiciones }) => {
        agregarCircuito(nombre, ubicacion, distancia, condiciones);
    });
}

// Función para guardar en LocalStorage
function guardarCircuitoLocal(nombre, ubicacion, distancia, condiciones) {
    let circuitos = JSON.parse(localStorage.getItem("circuitos")) || [];
    circuitos.push({ nombre, ubicacion, distancia, condiciones });
    localStorage.setItem("circuitos", JSON.stringify(circuitos));
}

// Cargar los circuitos al inicio
document.addEventListener("DOMContentLoaded", cargarCircuitos);


// Registrar el Web Component
customElements.define("circuito-component", CircuitoComponent);
