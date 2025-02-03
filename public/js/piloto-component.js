class PilotoComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                .piloto-card {
                    border: 3px solid red;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    background-color: black;
                    color: white;
                    width: 280px;
                    margin: 10px;
                    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                }
                .piloto-card:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 15px red;
                }
                .piloto-card img {
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
            <div class="piloto-card">
                <img id="imagen" alt="Piloto">
                <h3 id="nombre"></h3>
                <p id="equipo"></p>
                <p id="nacionalidad"></p>
                <p id="experiencia"></p>
                <p id="habilidades"></p>
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
        const img = this.shadowRoot.querySelector("#imagen");
        const src = this.getAttribute("imagen");
        img.src = src ? src : "assets/f1jugador.jpg";

        this.shadowRoot.querySelector("#nombre").textContent = this.getAttribute("nombre");
        this.shadowRoot.querySelector("#equipo").textContent = `Equipo: ${this.getAttribute("equipo")}`;
        this.shadowRoot.querySelector("#nacionalidad").textContent = `Nacionalidad: ${this.getAttribute("nacionalidad")}`;
        this.shadowRoot.querySelector("#experiencia").textContent = `Experiencia: ${this.getAttribute("experiencia")} años`;
        this.shadowRoot.querySelector("#habilidades").textContent = `Habilidades: ${this.getAttribute("habilidades")}`;
    }
}
customElements.define("piloto-component", PilotoComponent);
