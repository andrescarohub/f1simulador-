// Obtención de elementos del DOM
const form = document.getElementById('vehicle-form');
const vehicleCardsContainer = document.getElementById('vehicle-cards-container');
const searchBar = document.getElementById('search-bar');

// URL del JSON Server
const apiUrl = 'http://localhost:3000/vehicles'; //  URL json

// Función para obtener todos los vehículos del servidor
const getVehicles = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.forEach(vehicle => {
            createVehicleCard(vehicle);  // Crear una carta por cada vehículo
        });
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
    }
};

// Función para agregar un vehículo al servidor y crear la carta correspondiente
const addVehicleToDB = async (vehicleData) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicleData)
        });
        const newVehicle = await response.json();
        createVehicleCard(newVehicle); // Crear la carta del nuevo vehículo
    } catch (error) {
        console.error('Error al agregar el vehículo:', error);
    }
};

// Función para crear una carta de vehículo
const createVehicleCard = (vehicle) => {
    const vehicleCard = document.createElement('vehicle-card');
    vehicleCard.setAttribute('vehicle-data', JSON.stringify(vehicle));
    vehicleCardsContainer.appendChild(vehicleCard);  // Agregar la carta al contenedor
};

// Función para manejar el envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const vehicleData = {
        name: document.getElementById('name').value,
        max_speed: parseInt(document.getElementById('max-speed').value),
        acceleration: parseFloat(document.getElementById('acceleration').value),
        tire_consumption: parseFloat(document.getElementById('tire-consumption').value),
        team: document.getElementById('team').value,
        video: URL.createObjectURL(document.getElementById('video').files[0]), // Cargar el video
    };

    // Guardar en la base de datos (JSON Server) y crear la carta
    addVehicleToDB(vehicleData);

    // Limpiar formulario
    form.reset();
});

// Función de búsqueda para filtrar vehículos por nombre o equipo
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    vehicleCards.forEach((card) => {
        const vehicle = JSON.parse(card.getAttribute('vehicle-data'));
        const isVisible = vehicle.name.toLowerCase().includes(searchTerm) || vehicle.team.toLowerCase().includes(searchTerm);
        card.style.display = isVisible ? 'block' : 'none';
    });
});

// Llamar a la función para obtener los vehículos cuando se carga la página
getVehicles();
