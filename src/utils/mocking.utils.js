import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

// Valores por defecto en caso de que no existan las variables de entorno
const DEFAULT_PASSWORD = process.env.DEFAULT_USER_PASSWORD || 'coder123';
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

/**
 * Genera un usuario mock con la estructura compatible con el modelo User existente
 * @returns {Promise<Object>} Usuario mock con estructura MongoDB
 */
const generateMockUser = async () => {
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS);
    
    return {
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: [] // Mantiene la estructura original del modelo User
    };
};

/**
 * Genera una mascota mock con la estructura compatible con el modelo Pet existente
 * @returns {Object} Mascota mock con estructura MongoDB
 */
const generateMockPet = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.animal.dog(),
        specie: faker.helpers.arrayElement(['dog', 'cat', 'bird']),
        birthDate: faker.date.past(),
        adopted: faker.datatype.boolean(),
        owner: null, // Compatible con el modelo Pet existente
        image: null  // Campo opcional según el modelo original
    };
};

/**
 * Genera un array de usuarios mock
 * @param {number} count - Cantidad de usuarios a generar
 * @returns {Promise<Array>} Array de usuarios mock
 */
const generateUsers = async (count = 50) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(await generateMockUser());
    }
    return users;
};

/**
 * Genera un array de mascotas mock
 * @param {number} count - Cantidad de mascotas a generar
 * @returns {Array} Array de mascotas mock
 */
const generatePets = (count = 100) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push(generateMockPet());
    }
    return pets;
};

export {
    generateUsers,
    generatePets,
    generateMockUser,
    generateMockPet
}; 