// microservices/ms-0-auth/routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');

// Exportamos una función que recibe el Modelo 'User'
module.exports = (User) => {
    const router = express.Router();

    // 1. Ruta de Registro: POST /auth/register
    // Llama a la función register del controlador, pasándole req, res y el modelo User
    router.post('/register', (req, res) => authController.register(req, res, User));

    // 2. Ruta de Login: POST /auth/login
    // Llama a la función login del controlador, pasándole req, res y el modelo User
    router.post('/login', (req, res) => authController.login(req, res, User));

    return router;
};