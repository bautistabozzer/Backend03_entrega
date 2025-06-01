import { body, query, validationResult } from 'express-validator';
import { AppError } from './error.middleware.js';

export const validateGenerateData = [
    body('users')
        .optional()
        .isInt({ min: 0, max: 1000 })
        .withMessage('users debe ser un número entre 0 y 1000'),
    body('pets')
        .optional()
        .isInt({ min: 0, max: 1000 })
        .withMessage('pets debe ser un número entre 0 y 1000'),
    handleValidationErrors
];

export const validateMockingCount = [
    query('count')
        .optional()
        .isInt({ min: 1, max: 1000 })
        .withMessage('count debe ser un número entre 1 y 1000'),
    handleValidationErrors
];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError(JSON.stringify(errors.array()), 400);
    }
    next();
} 