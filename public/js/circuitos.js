class CircuitoComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                .circuito-card {
                    border: 3px solid red;
                    padding: 10px;
                    border-radius: 10px;
                    text-align: center;
                    background-color: black;
                    color: white;
                    width: 250px;
                    margin: 10px;
                    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                }
                .circuito-card:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 15px red;
                }
                .circuito-card video {
                    width: 100%;
                    border-radius: 10px;
                }
                .botones {
                    margin-top: 10px;
                }
                .btn {
                    background-color: black;
                    color: white;
                    border: 1px solid red;
                    padding: 5px 10px;
                    margin: 3px;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .btn:hover {
                    background-color: red;
                }
                .opciones-menu {
                    display: none;
                }
                .opciones-menu.show {
                    display: block;
                }
            </style>
            <div class="circuito-card">
                <video autoplay loop muted>
                    <source src="assets/pista.mp4" type="video/mp4">
                    Tu navegador no soporta videos HTML5.
                </video>
                <h3 id="nombre"></h3>
                <p id="ubicacion"></p>
                <p id="distancia"></p>
                <p id="condiciones"></p>
                <div class="botones">
                    <button class="btn opciones">Opciones</button>
                    <div class="opciones-menu">
                        <button class="btn editar">Editar</button>
                        <button class="btn eliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector("#nombre").textContent = this.getAttribute("nombre");
        this.shadowRoot.querySelector("#ubicacion").textContent = `Ubicación: ${this.getAttribute("ubicacion")}`;
        this.shadowRoot.querySelector("#distancia").textContent = `Distancia: ${this.getAttribute("distancia")} km`;
        this.shadowRoot.querySelector("#condiciones").textContent = `Condiciones: ${this.getAttribute("condiciones")}`;

        // Manejo de menú de opciones
        const btnOpciones = this.shadowRoot.querySelector(".opciones");
        const menuOpciones = this.shadowRoot.querySelector(".opciones-menu");

        btnOpciones.addEventListener("click", () => {
            menuOpciones.classList.toggle("show");
        });

        // Evento para eliminar
        this.shadowRoot.querySelector(".eliminar").addEventListener("click", () => {
            this.remove();
            eliminarCircuito(this.getAttribute("nombre"));
        });

        // Evento para editar
        this.shadowRoot.querySelector(".editar").addEventListener("click", () => {
            cargarEdicionCircuito(this);
        });
    }
}

customElements.define("circuito-component", CircuitoComponent);

// Función para eliminar un circuito del servidor
async function eliminarCircuito(nombre) {
    try {
        const response = await fetch(`http://localhost:3000/circuitos?nombre=${nombre}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Error al eliminar el circuito");
        }
    } catch (error) {
        console.error("Error eliminando el circuito:", error);
    }
}
