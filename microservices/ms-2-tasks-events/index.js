// index.js
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models/index');
const Task = require('./models/Task');
const Event = require('./models/Event');
const Reminder = require('./models/Reminder');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// 👇 Middleware de depuración más detallado
app.use((req, res, next) => {
  console.log(`🛰️ [MS-TASKS] Petición recibida: ${req.method} ${req.originalUrl}`);
  console.log(`   Headers:`, req.headers);
  next();
});

// ✅ Endpoint raíz de prueba
app.get('/', (req, res) => {
  res.send('Microservicio de tareas activo 🚀');
});

// ✅ Monta las rutas correctamente
app.use('/tasks', taskRoutes);

// sincronización de modelos
sequelize.sync({ alter: true }).then(() => {
  console.log('📦 Base de datos sincronizada');
  app.listen(process.env.PORT || 3002, () => {
    console.log(`⚡️ Microservicio de tareas corriendo en puerto ${process.env.PORT || 3002}`);
  });
});
