import UserDAO from '../dao/Users.dao.js';

/**
 * Servicio de usuarios que mantiene la compatibilidad con el sistema original
 * y agrega la funcionalidad de creación masiva para mocks
 */
class UserService {
    constructor() {
        this.dao = new UserDAO();
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
     * Método para crear múltiples usuarios
     * Agregado para soportar la generación de datos mock
     * @param {Array} users - Array de usuarios a crear
     * @returns {Promise<Array>} Usuarios creados
     */
    async createMany(users) {
        return await this.dao.createMany(users);
    }

    async update(id, data) {
        return await this.dao.update(id, data);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}

export const userService = new UserService(); 