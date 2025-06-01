import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import swaggerUiExpress from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { specs } from './utils/swagger.config.js';

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adoptme';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve('public')));

// Swagger
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ status: 'success', message: 'El servidor está funcionando correctamente' });
});

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// Opciones de MongoDB
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

console.log('Intentando conectar a MongoDB en:', MONGODB_URI);

// Conexión a MongoDB
mongoose.connect(MONGODB_URI, mongoOptions)
    .then(() => {
        console.log('Conectado a MongoDB exitosamente');
        app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
    })
    .catch(error => {
        console.error('Error al conectar a MongoDB:', error.message);
        console.error('Stack completo del error:', error.stack);
        process.exit(1); // Terminamos el proceso si no podemos conectar a MongoDB
    });

// Middleware de manejo de errores centralizado
app.use(errorHandler);
