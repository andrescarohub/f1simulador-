// Definición del web component para la card del vehículo
class VehicleCard extends HTMLElement {
    constructor() {
      super();
      // Usamos shadow DOM para encapsular estilos
      this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback() {
      // Obtener atributos pasados al componente
      const modelo = this.getAttribute('modelo') || 'Modelo desconocido';
      const velocidad = this.getAttribute('velocidad') || 0;
      const aceleracion = this.getAttribute('aceleracion') || 0;
      const consumo = this.getAttribute('consumo') || 0;
      const desgaste = this.getAttribute('desgaste') || 0;
      const color = this.getAttribute('color') || 'default';
  
      // Plantilla del componente
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <style>
          .card {
            margin: 15px;
            width: 300px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border-radius: 5px;
            overflow: hidden;
            background-color: #fff;
          }
          .card-header {
            background-color: #dc3545;
            color: #fff;
            text-align: center;
            font-weight: bold;
            padding: 10px;
          }
          .video {
            width: 100%;
            height: auto;
            display: block;
          }
          .card-body {
            padding: 10px;
          }
          .progress {
            height: 10px;
            margin-bottom: 10px;
          }
          .progress-bar {
            background-color: #dc3545;
          }
          .stat {
            font-size: 0.9em;
            margin-bottom: 5px;
          }
        </style>
        <div class="card">
          <div class="card-header">
            ${modelo}
          </div>
          <video class="video" autoplay muted loop playsinline>
            <source src="assets/vehiculos/${color}.mp4" type="video/mp4">
            Tu navegador no soporta videos HTML5.
          </video>
          <div class="card-body">
            <div class="stat">Velocidad</div>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${velocidad}%" aria-valuenow="${velocidad}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="stat">Aceleración</div>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${aceleracion}%" aria-valuenow="${aceleracion}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="stat">Consumo de Combustible</div>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${consumo}%" aria-valuenow="${consumo}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="stat">Desgaste de Neumáticos</div>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${desgaste}%" aria-valuenow="${desgaste}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  // Registrar el web component
  customElements.define('vehicle-card', VehicleCard);
  
  // Función para cargar vehículos desde el API (JSON Server)
  function cargarVehiculos() {
    fetch('http://localhost:3000/vehiculos')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('cards-container');
        data.forEach(vehiculo => {
          const card = document.createElement('vehicle-card');
          card.setAttribute('modelo', vehiculo.modelo);
          card.setAttribute('velocidad', vehiculo.velocidad);
          card.setAttribute('aceleracion', vehiculo.aceleracion);
          card.setAttribute('consumo', vehiculo.consumo);
          card.setAttribute('desgaste', vehiculo.desgaste);
          card.setAttribute('color', vehiculo.color);
          container.appendChild(card);
        });
      })
      .catch(error => console.error('Error al cargar vehículos:', error));
  }
  
  // Ejecutamos la carga de vehículos al iniciar la página
  document.addEventListener('DOMContentLoaded', cargarVehiculos);
  