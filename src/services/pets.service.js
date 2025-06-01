import PetDAO from '../dao/Pets.dao.js';

/**
 * Servicio de mascotas que mantiene la compatibilidad con el sistema original
 * y agrega la funcionalidad de creación masiva para mocks
 */
class PetService {
    constructor() {
        this.dao = new PetDAO();
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async create(data) {
        return await this.dao.create(data);
    }

    /**
     * Método para crear múltiples mascotas
     * Agregado para soportar la generación de datos mock
     * @param {Array} pets - Array de mascotas a crear
     * @returns {Promise<Array>} Mascotas creadas
     */
    async createMany(pets) {
        return await this.dao.createMany(pets);
    }

    async update(id, data) {
        return await this.dao.update(id, data);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}

export const petService = new PetService(); 