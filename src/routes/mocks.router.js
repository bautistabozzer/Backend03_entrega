import { Router } from 'express';
import { generateUsers, generatePets } from '../utils/mocking.utils.js';
import { userService } from '../services/users.service.js';
import { petService } from '../services/pets.service.js';
import { validateGenerateData, validateMockingCount } from '../middlewares/validator.middleware.js';
import { AppError } from '../middlewares/error.middleware.js';

const router = Router();

/**
 * Ruta para obtener usuarios mock
 * @route GET /api/mocks/mockingusers
 * @query {number} count - Cantidad de usuarios a generar (opcional, default: 50)
 */
router.get('/mockingusers', validateMockingCount, async (req, res, next) => {
    try {
        const count = parseInt(req.query.count) || 50;
        const users = await generateUsers(count);
        res.json({ 
            status: 'success', 
            payload: users,
            count: users.length
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
});

/**
 * Ruta para obtener mascotas mock
 * @route GET /api/mocks/mockingpets
 * @query {number} count - Cantidad de mascotas a generar (opcional, default: 100)
 */
router.get('/mockingpets', validateMockingCount, async (req, res, next) => {
    try {
        const count = parseInt(req.query.count) || 100;
        const pets = generatePets(count);
        res.json({ 
            status: 'success', 
            payload: pets,
            count: pets.length
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
});

/**
 * Ruta para generar e insertar usuarios y mascotas
 * @route POST /api/mocks/generateData
 * @body {number} users - Cantidad de usuarios a generar (opcional)
 * @body {number} pets - Cantidad de mascotas a generar (opcional)
 */
router.post('/generateData', validateGenerateData, async (req, res, next) => {
    try {
        const { users = 0, pets = 0 } = req.body;
        
        let results = {
            users: [],
            pets: []
        };

        if (users > 0) {
            const mockUsers = await generateUsers(users);
            results.users = await userService.createMany(mockUsers);
        }

        if (pets > 0) {
            const mockPets = generatePets(pets);
            results.pets = await petService.createMany(mockPets);
        }

        res.json({ 
            status: 'success', 
            message: `Se generaron ${users} usuarios y ${pets} mascotas correctamente`,
            payload: { 
                users: results.users.length,
                pets: results.pets.length,
                data: results
            }
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
});

// Ruta para probar logs
router.get('/loggerTest', (req, res) => {
    console.log('[MOCKS] Log de nivel INFO: Prueba de logs desde /api/mocks/loggerTest');
    console.warn('[MOCKS] Log de nivel WARN: Prueba de logs desde /api/mocks/loggerTest');
    console.error('[MOCKS] Log de nivel ERROR: Prueba de logs desde /api/mocks/loggerTest');
    res.json({ message: 'Logs generados correctamente. Revisa la consola del servidor.' });
});

export default router; 