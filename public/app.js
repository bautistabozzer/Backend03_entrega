document.addEventListener('DOMContentLoaded', () => {
    const generateUsersBtn = document.getElementById('generateUsers');
    const generateDataForm = document.getElementById('generateDataForm');
    const resultsContainer = document.getElementById('results');
    const testLogsBtn = document.getElementById('testLogs');
    const logsResult = document.getElementById('logsResult');

    // Sección de Adopciones
    const getAllAdoptionsBtn = document.getElementById('getAllAdoptions');
    const getAdoptionForm = document.getElementById('getAdoptionForm');
    const createAdoptionForm = document.getElementById('createAdoptionForm');
    const adoptionsResult = document.getElementById('adoptionsResult');

    // Sección para ver usuarios y mascotas existentes
    const showAllUsersBtn = document.getElementById('showAllUsers');
    const showAllPetsBtn = document.getElementById('showAllPets');
    const allUsersPetsResult = document.getElementById('allUsersPetsResult');

    // Función para mostrar el loading
    const showLoading = (element) => {
        element.innerHTML = '<div class="loading"></div> Cargando...';
    };

    // Función para mostrar errores
    const showError = (element, message) => {
        element.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    };

    // Función para mostrar usuarios
    const displayUsers = (users) => {
        const usersHTML = users.map(user => `
            <div class="user-card">
                <strong>Email:</strong> ${user.email}<br>
                <strong>Rol:</strong> ${user.role}<br>
                <strong>ID:</strong> ${user._id || 'N/A'}
            </div>
        `).join('');
        resultsContainer.innerHTML = usersHTML;
    };

    // Función para mostrar mascotas
    const displayPets = (pets) => {
        const petsHTML = pets.map(pet => `
            <div class="pet-card">
                <strong>Nombre:</strong> ${pet.name}<br>
                <strong>Tipo:</strong> ${pet.specie || pet.type || 'N/A'}<br>
                <strong>Dueño ID:</strong> ${pet.owner || 'N/A'}<br>
                <strong>ID:</strong> ${pet._id || 'N/A'}
            </div>
        `).join('');
        resultsContainer.innerHTML += petsHTML;
    };

    // Mostrar adopciones
    const displayAdoptions = (adoptions) => {
        if (!adoptions || !adoptions.length) {
            adoptionsResult.innerHTML = '<div class="alert alert-warning">No hay adopciones registradas.</div>';
            return;
        }
        adoptionsResult.innerHTML = adoptions.map(adopt => `
            <div class="adoption-card">
                <strong>ID:</strong> ${adopt._id}<br>
                <strong>Usuario:</strong> ${adopt.owner}<br>
                <strong>Mascota:</strong> ${adopt.pet}
            </div>
        `).join('');
    };

    // Generar usuarios mock
    generateUsersBtn.addEventListener('click', async () => {
        showLoading(resultsContainer);
        try {
            const response = await fetch('/api/mocks/mockingusers');
            const data = await response.json();
            if (data.status === 'success') {
                displayUsers(data.payload);
            } else {
                showError(resultsContainer, 'Error al generar usuarios: ' + (data.error || 'Desconocido'));
            }
        } catch (error) {
            showError(resultsContainer, 'Error al generar usuarios: ' + error.message);
        }
    });

    // Generar usuarios y mascotas
    generateDataForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usersCount = document.getElementById('usersCount').value;
        const petsCount = document.getElementById('petsCount').value;

        showLoading(resultsContainer);
        try {
            const response = await fetch('/api/mocks/generateData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    users: parseInt(usersCount),
                    pets: parseInt(petsCount)
                })
            });
            const data = await response.json();
            if (data.status === 'success') {
                resultsContainer.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
                // Mostrar los datos insertados consultando la API real
                const [usersRes, petsRes] = await Promise.all([
                    fetch('/api/users'),
                    fetch('/api/pets')
                ]);
                const usersData = await usersRes.json();
                const petsData = await petsRes.json();
                if (usersData.payload) displayUsers(usersData.payload);
                if (petsData.payload) displayPets(petsData.payload);
            } else {
                showError(resultsContainer, 'Error al generar datos: ' + (data.error || 'Desconocido'));
            }
        } catch (error) {
            showError(resultsContainer, 'Error al generar datos: ' + error.message);
        }
    });

    // Probar logs (adaptado a un endpoint real de logs)
    testLogsBtn.addEventListener('click', async () => {
        showLoading(logsResult);
        try {
            const response = await fetch('/api/mocks/loggerTest');
            const data = await response.json();
            logsResult.innerHTML = `
                <div class="alert alert-success">
                    ${data.message || 'Logs generados. Revisa la consola del servidor.'}<br>
                    <small>Revisa la consola del servidor para ver los diferentes niveles de log.</small>
                </div>
            `;
        } catch (error) {
            showError(logsResult, 'Error al probar logs: ' + error.message);
        }
    });

    // Ver todas las adopciones
    getAllAdoptionsBtn.addEventListener('click', async () => {
        adoptionsResult.innerHTML = 'Cargando...';
        try {
            const res = await fetch('/api/adoptions');
            const data = await res.json();
            if (data.status === 'success') {
                displayAdoptions(data.payload);
            } else {
                adoptionsResult.innerHTML = '<div class="alert alert-danger">Error al obtener adopciones.</div>';
            }
        } catch (err) {
            adoptionsResult.innerHTML = '<div class="alert alert-danger">Error al obtener adopciones.</div>';
        }
    });

    // Buscar adopción por ID
    getAdoptionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('adoptionId').value.trim();
        if (!id) return;
        adoptionsResult.innerHTML = 'Cargando...';
        try {
            const res = await fetch(`/api/adoptions/${id}`);
            const data = await res.json();
            if (data.status === 'success') {
                displayAdoptions([data.payload]);
            } else {
                adoptionsResult.innerHTML = '<div class="alert alert-warning">No se encontró la adopción.</div>';
            }
        } catch (err) {
            adoptionsResult.innerHTML = '<div class="alert alert-danger">Error al buscar adopción.</div>';
        }
    });

    // Adoptar mascota
    createAdoptionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value.trim();
        const petId = document.getElementById('petId').value.trim();
        if (!userId || !petId) return;
        adoptionsResult.innerHTML = 'Procesando adopción...';
        try {
            const res = await fetch(`/api/adoptions/${userId}/${petId}`, { method: 'POST' });
            const data = await res.json();
            if (data.status === 'success') {
                adoptionsResult.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            } else {
                adoptionsResult.innerHTML = `<div class="alert alert-danger">${data.error || 'Error al adoptar.'}</div>`;
            }
        } catch (err) {
            adoptionsResult.innerHTML = '<div class="alert alert-danger">Error al procesar la adopción.</div>';
        }
    });

    showAllUsersBtn.addEventListener('click', async () => {
        allUsersPetsResult.innerHTML = 'Cargando usuarios...';
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            if (data.status === 'success' && data.payload.length) {
                allUsersPetsResult.innerHTML = data.payload.map(user => `
                    <div class="user-card">
                        <strong>Email:</strong> ${user.email}<br>
                        <strong>Rol:</strong> ${user.role}<br>
                        <strong>ID:</strong> ${user._id}
                    </div>
                `).join('');
            } else {
                allUsersPetsResult.innerHTML = '<div class="alert alert-warning">No hay usuarios registrados.</div>';
            }
        } catch (err) {
            allUsersPetsResult.innerHTML = '<div class="alert alert-danger">Error al obtener usuarios.</div>';
        }
    });

    showAllPetsBtn.addEventListener('click', async () => {
        allUsersPetsResult.innerHTML = 'Cargando mascotas...';
        try {
            const res = await fetch('/api/pets');
            const data = await res.json();
            if (data.status === 'success' && data.payload.length) {
                allUsersPetsResult.innerHTML = data.payload.map(pet => `
                    <div class="pet-card">
                        <strong>Nombre:</strong> ${pet.name}<br>
                        <strong>Tipo:</strong> ${pet.specie || pet.type || 'N/A'}<br>
                        <strong>Dueño ID:</strong> ${pet.owner || 'N/A'}<br>
                        <strong>ID:</strong> ${pet._id || 'N/A'}
                    </div>
                `).join('');
            } else {
                allUsersPetsResult.innerHTML = '<div class="alert alert-warning">No hay mascotas registradas.</div>';
            }
        } catch (err) {
            allUsersPetsResult.innerHTML = '<div class="alert alert-danger">Error al obtener mascotas.</div>';
        }
    });
}); 