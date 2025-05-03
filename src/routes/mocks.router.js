import { Router } from 'express';
import { generateUsers, generatePets } from '../utils/mocking.utils.js';
import { userService } from '../services/users.service.js';
import { petService } from '../services/pets.service.js';

const router = Router();

/**
 * Endpoint para generar usuarios mock
 * Mantiene la misma estructura de respuesta que el sistema original
 * @route GET /api/mocks/mockingusers
 */
router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateUsers(50);
        res.json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

/**
 * Endpoint para generar mascotas mock
 * Mantiene la misma estructura y comportamiento que la implementación original
 * @route GET /api/mocks/mockingpets
 */
router.get('/mockingpets', async (req, res) => {
    try {
        const pets = generatePets(100);
        res.json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

/**
 * Endpoint para generar e insertar datos en la base de datos
 * Nuevo endpoint que no afecta la funcionalidad existente
 * @route POST /api/mocks/generateData
 */
router.post('/generateData', async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;
        
        // Validación de tipos y valores
        if (typeof users !== 'number' || typeof pets !== 'number') {
            return res.status(400).json({ 
                status: 'error', 
                error: 'Los valores deben ser números' 
            });
        }

        if (users < 0 || pets < 0) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'Los valores deben ser números positivos' 
            });
        }

        // Límite razonable para evitar sobrecarga
        if (users > 1000 || pets > 1000) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'El límite máximo es 1000 registros por tipo' 
            });
        }

        const mockUsers = await generateUsers(users);
        const mockPets = generatePets(pets);

        if (users > 0) {
            await userService.createMany(mockUsers);
        }

        if (pets > 0) {
            await petService.createMany(mockPets);
        }

        res.json({ 
            status: 'success', 
            message: `Se generaron ${users} usuarios y ${pets} mascotas correctamente`,
            payload: { 
                generatedUsers: users, 
                generatedPets: pets 
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

export default router; 