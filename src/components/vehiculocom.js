class VehicleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const vehicle = JSON.parse(this.getAttribute('vehicle-data'));

        // Definir la plantilla del Web Component
        this.shadowRoot.innerHTML = `
            <style>
                .vehicle-card {
                    background-color: #fff;
                    margin: 10px;
                    padding: 10px;
                    border-radius: 10px;
                    width: 100%;
                    max-width: 250px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    text-align: center;
                    transition: transform 0.3s ease;
                }

                .vehicle-card:hover {
                    transform: scale(1.05);
                }

                .vehicle-card h3 {
                    margin: 10px 0;
                    font-size: 18px;
                    color: #dc3545;
                }

                .vehicle-card video {
                    width: 100%;
                    border-radius: 5px;
                }

                .icons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                }

                .icons i {
                    cursor: pointer;
                    font-size: 18px;
                    color: #dc3545;
                }
            </style>

            <div class="vehicle-card card" id ="vehicle-card">
                <h3>${vehicle.name}</h3>
                <video controls>
                    <source src="${vehicle.video}" type="video/web">
                    Your browser does not support the video tag.
                </video>
                <div class="icons">
                    <i class="fas fa-edit" id="edit-btn" title="Editar"></i>
                    <i class="fas fa-trash" id="delete-btn" title="Eliminar"></i>
                </div>
            </div>
        `;

        // Asegurarnos de que los botones existen antes de añadirles los eventos
        const editBtn = this.shadowRoot.querySelector('#edit-btn');
        const deleteBtn = this.shadowRoot.querySelector('#delete-btn');

        if (editBtn && deleteBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                alert('Función de editar activada.');
            });

            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                alert('Función de eliminar activada.');
            });
        }

        // Añadir evento de clic para abrir el modal con la información completa
        this.shadowRoot.querySelector('#vehicle-card').addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('vehicleModal'));
            document.getElementById('vehicleModalLabel').textContent = vehicle.name;
            document.getElementById('modal-video-source').src = vehicle.video;
            document.getElementById('modal-video').load();
            document.getElementById('vehicle-details').innerHTML = `
                Velocidad máxima: ${vehicle.max_speed} km/h <br>
                Aceleración: ${vehicle.acceleration} s (0-100 km/h) <br>
                Consumo de neumáticos: ${vehicle.tire_consumption} <br>
                Equipo: ${vehicle.team}
            `;
            modal.show();  // Mostrar el modal
        });
    }
}

customElements.define('vehicle-card', VehicleCard);
