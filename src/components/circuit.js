class CircuitComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<p class="text-danger">Componente de Circuito Cargado</p>`;
    }
}
customElements.define("circuit-component", CircuitComponent);
