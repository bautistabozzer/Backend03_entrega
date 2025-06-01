# Sistema de Adopción de Mascotas

API REST para la gestión de adopciones de mascotas. Este proyecto permite administrar usuarios, mascotas y procesos de adopción.

Repositorio: [https://github.com/bautistabozzer/Backend03_entrega](https://github.com/bautistabozzer/Backend03_entrega)

## Características Principales

- Gestión de usuarios
- Gestión de mascotas
- Sistema de adopciones
- Documentación con Swagger
- Tests automatizados
- Dockerizado

## Documentación

La documentación completa de la API está disponible a través de Swagger UI en:
```
http://localhost:8080/api-docs
```

## Endpoints Principales

### Usuarios (/api/users)
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:uid` - Obtener usuario por ID
- `PUT /api/users/:uid` - Actualizar usuario
- `DELETE /api/users/:uid` - Eliminar usuario

### Mascotas (/api/pets)
- `GET /api/pets` - Obtener todas las mascotas
- `POST /api/pets` - Crear nueva mascota
- `GET /api/pets/:pid` - Obtener mascota por ID

### Adopciones (/api/adoptions)
- `GET /api/adoptions` - Listar todas las adopciones
- `GET /api/adoptions/:aid` - Obtener adopción por ID
- `POST /api/adoptions/:uid/:pid` - Crear nueva adopción

## Instalación y Uso

### Desarrollo Local

1. Clonar el repositorio:
```bash
git clone https://github.com/bautistabozzer/Backend03_entrega.git
cd Backend03_entrega
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar en modo desarrollo:
```bash
npm run dev
```

### Docker

La imagen está disponible en Docker Hub:
```bash
docker pull bautistabozzer/backend03_entrega_v2-app:latest
```

Para ejecutar el contenedor:
```bash
docker run -p 8080:8080 bautistabozzer/backend03_entrega_v2-app:latest
```

Para construir la imagen localmente:
```bash
docker build -t backend03_entrega_v2-app .
docker run -p 8080:8080 backend03_entrega_v2-app
```

## Tests

El proyecto incluye tests funcionales completos para todos los endpoints. Para ejecutar los tests:

```bash
npm test
```

### Cobertura de Tests

Los tests cubren:
- Endpoints de adopción
  - Listado de adopciones
  - Obtención de adopción específica
  - Creación de adopción
  - Manejo de errores
- Validaciones
  - Mascota ya adoptada
  - Usuario inexistente
  - Mascota inexistente

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Swagger
- Jest/Mocha/Chai para testing
- Docker

## Estructura del Proyecto

```
src/
├── controllers/     # Controladores de la aplicación
├── dao/            # Capa de acceso a datos
├── models/         # Modelos de datos
├── routes/         # Definición de rutas
├── services/       # Lógica de negocio
└── utils/          # Utilidades y helpers
```

## Variables de Entorno

El proyecto utiliza las siguientes variables de entorno:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/adoptme
```

## Contribución

1. Fork del repositorio
2. Crear rama para nueva funcionalidad
3. Commit de cambios
4. Push a la rama
5. Crear Pull Request

## Licencia

ISC

## Imagen en Docker Hub

La imagen del proyecto está disponible en:
[https://hub.docker.com/r/bautistabozzer/backend03_entrega_v2-app](https://hub.docker.com/r/bautistabozzer/backend03_entrega_v2-app) 