import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Adopción de Mascotas',
            version: '1.0.0',
            description: 'Documentación de la API de adopción de mascotas'
        }
    },
    apis: ['./src/routes/*.js']
};

export const specs = swaggerJSDoc(swaggerOptions); 