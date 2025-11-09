// gateway/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Carga las variables de entorno

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Se requiere un token de autenticación.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado. Vuelva a iniciar sesión.' });
    }
};

module.exports = authMiddleware;
