// gateway/routes/gatewayRoutes.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = (app) => {
    // Habilitar CORS para el frontend
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }));

    // ================================
    // 🧩 Microservicio de Autenticación (MS-0)
    // ================================
    // Público → /auth/register, /auth/login
    app.use('/auth', createProxyMiddleware({
        target: process.env.MS0_AUTH_URL || 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: { '^/auth': '' },
        onProxyReq: (proxyReq, req) => {
            console.log(`➡️ [AUTH] ${req.method} ${req.originalUrl}`);
        },
    }));

    // ================================
    // 🧩 Microservicio de Tareas (MS-2)
    // ================================
    app.use(
    '/tasks',
    authMiddleware,
    createProxyMiddleware({
        target: process.env.MS2_TASKS_URL || 'http://localhost:3002',
        changeOrigin: true,
        // 👇 Forzamos que todas las peticiones de /tasks vayan a /tasks en el microservicio
        pathRewrite: (path, req) => {
        console.log(`🛰️ [GATEWAY] Recibido en gateway: ${req.method} ${path}`);
        const rewritten = '/tasks' + (path === '/' ? '' : path.replace(/^\/tasks/, ''));
        console.log(`🔁 [GATEWAY] Reescrito a: ${rewritten}`);
        return rewritten;
        },
        onProxyReq: (proxyReq, req) => {
        console.log(`➡️ [GATEWAY] Redirigiendo hacia MS-2: ${proxyReq.path}`);
        },
        onError: (err, req, res) => {
        console.error('❌ Error al redirigir al microservicio de tareas:', err.message);
        res.status(500).json({ error: 'Error al conectar con el microservicio de tareas' });
        },
    })
    );


    // ================================
    // 🧩 Microservicio de Validación (MS-3)
    // ================================
    // Protegido con JWT
    app.use('/validate', authMiddleware, createProxyMiddleware({
        target: process.env.MS3_VALIDATION_URL || 'http://localhost:3003',
        changeOrigin: true,
        pathRewrite: { '^/validate': '' },
        onProxyReq: (proxyReq, req) => {
            console.log(`➡️ [VALIDATE] ${req.method} ${req.originalUrl}`);
        },
    }));

    // ================================
    // 🚨 Fallback general
    // ================================
    app.use((req, res) => {
        res.status(404).json({ message: 'Ruta no encontrada en el Gateway' });
    });
};
