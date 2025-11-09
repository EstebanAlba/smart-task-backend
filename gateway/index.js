// gateway/index.js
const express = require('express');
const dotenv = require('dotenv');
const setupGatewayRoutes = require('./routes/gatewayRoutes');

dotenv.config();

const app = express();
// app.use(express.json()); ❌ No proceses JSON en el Gateway

const PORT = process.env.PORT || 3000;
// Middleware de depuración global — log de todas las peticiones entrantes
app.use((req, res, next) => {
  console.log(`🔎 [GATEWAY-IN] ${req.method} ${req.originalUrl} (url:${req.url})`);
  next();
});

setupGatewayRoutes(app);

app.listen(PORT, () => {
  console.log(`⚡️ API Gateway corriendo en http://localhost:${PORT}`);
});
