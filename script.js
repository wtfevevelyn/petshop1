// URL base de la API
const API_URL = "https://tuperro-api.com";

// Función para manejar el login
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hacer solicitud POST al endpoint de login
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        // Login exitoso, ocultar sección de login y mostrar contenido
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        cargarMascotas();
    } else {
        // Mostrar mensaje de error
        document.getElementById('error-message').textContent = data.message;
        document.getElementById('error-message').style.display = 'block';
    }
});

// Función para cargar la lista de mascotas
async function cargarMascotas() {
    const response = await fetch(`${API_URL}/mascotas`);
    const mascotas = await response.json();

    const mascotasList = document.getElementById('mascotas-list');
    mascotasList.innerHTML = '';  // Limpiar la lista antes de agregar nuevas mascotas

    mascotas.forEach(mascota => {
        const li = document.createElement('li');
        li.textContent = `ID: ${mascota.id} - ${mascota.nombre} - Estado: ${mascota.estado}`;
        mascotasList.appendChild(li);
    });
}

// Consultar detalles de una mascota por ID
document.getElementById('consulta-mascota-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const mascotaId = document.getElementById('consulta-mascota-id').value;

    // Hacer solicitud GET al endpoint de mascotas por ID
    const response = await fetch(`${API_URL}/mascotas/${mascotaId}`);

    if (response.ok) {
        const mascota = await response.json();

        document.getElementById('detalle-nombre').innerText = "Nombre: " + mascota.nombre;
        document.getElementById('detalle-edad').innerText = "Edad: " + mascota.edad;
        document.getElementById('detalle-estado').innerText = "Estado: " + mascota.estado;
        document.getElementById('detalle-descripcion').innerText = "Descripción: " + mascota.descripcion;

        document.getElementById('detalle-mascota-info').style.display = 'block';
    } else {
        alert("No se encontró una mascota con el ID ingresado.");
    }
});

// Crear una orden de compra
document.getElementById('orden-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const mascotaId = document.getElementById('compra-mascota-id').value;
    const cantidad = document.getElementById('cantidad').value;

    // Hacer solicitud POST al endpoint de crear orden
    const response = await fetch(`${API_URL}/orden`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mascotaId, cantidad })
    });

    if (response.ok) {
        alert("Orden creada con éxito para la mascota ID: " + mascotaId + ", Cantidad: " + cantidad);
    } else {
        alert("No se pudo crear la orden. Revisa los datos ingresados.");
    }
});

// Botón de logout
document.getElementById('logout-btn').addEventListener('click', function() {
    // Volver a mostrar el login y ocultar el contenido
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('content').style.display = 'none';
});
