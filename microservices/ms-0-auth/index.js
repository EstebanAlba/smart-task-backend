//index.js - Microservicio de Autenticación (MS-0)
const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const cors = require('cors');

// Carga variables del archivo .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1️⃣ Conexión a la Base de Datos ---
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// --- 2️⃣ Importar el Modelo ---
const UserModel = require('./models/User');
const User = UserModel(sequelize);

// --- 3️⃣ Importar Rutas ---
const authRoutes = require('./routes/authRoutes')(User);
app.use('/', authRoutes);

// --- 4️⃣ Ruta de prueba ---
app.get('/', (req, res) => {
  res.send('✅ Servicio de Autenticación (MS-0) operativo.');
});

// --- 5️⃣ Iniciar Servidor ---
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MS-0: Conexión exitosa a la base de datos.');

    // 🔄 Sincronizar modelo (solo en desarrollo)
    await sequelize.sync({ alter: true });
    console.log('📦 Tablas sincronizadas correctamente.');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 MS-0 corriendo en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar MS-0:', error.message);
  }
};

startServer();
