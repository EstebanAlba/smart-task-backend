// microservices/ms-0-auth/controllers/authController.js

const jwt = require('jsonwebtoken');

// La clave secreta para firmar el JWT (DEBE ser la misma que en .env)
const JWT_SECRET = process.env.JWT_SECRET;

// ------------------------------
// FUNCIÓN DE REGISTRO (POST /auth/register)
// ------------------------------
exports.register = async (req, res, User) => {
  // 1. Obtiene los datos del Body de la petición
  const { email, password } = req.body;

  // Validación básica para evitar que el código se bloquee por falta de datos
  if (!email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios: email y password.' });
  }

  try {
    // 2. Verifica si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado.' });
    }

    // 3. Crea y guarda el usuario (el hook 'beforeCreate' en User.js hashea la contraseña)
    const newUser = await User.create({ email, password, authType: 'local' });

    // 4. Genera un JWT para la sesión
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email }, 
        JWT_SECRET, 
        { expiresIn: '1d' } // El token expira en 1 día
    );

    // 5. Envía la respuesta HTTP (lo que soluciona el bloqueo)
    res.status(201).json({ 
        message: 'Registro exitoso.', 
        token,
        userId: newUser.id 
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error interno del servidor durante el registro.' });
  }
};


// ------------------------------
// FUNCIÓN DE LOGIN (POST /auth/login)
// ------------------------------
exports.login = async (req, res, User) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar al usuario por email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }
    
    // 2. Comparar la contraseña (usa el método que definiste en User.js)
    const isMatch = await user.comparePassword(password); 

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 3. Si las credenciales son correctas, generar el JWT
    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        JWT_SECRET, 
        { expiresIn: '1d' }
    );

    // 4. Envía la respuesta HTTP
    res.status(200).json({ 
        message: 'Login exitoso.', 
        token,
        userId: user.id 
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor durante el login.' });
  }
};