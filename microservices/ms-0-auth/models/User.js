// microservices/ms-0-auth/models/User.js

const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); // Necesitas instalar bcryptjs si no lo hiciste

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Puede ser nulo si el login es con Google
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true, // Puede ser nulo si el login es local
    },
    authType: {
      type: DataTypes.ENUM('local', 'google'),
      allowNull: false,
      defaultValue: 'local',
    },
  }, {
    tableName: 'users',
    timestamps: true,
    // Opciones para hooks (ganchos)
    hooks: {
      // Hook que hashea la contraseña antes de guardar el usuario si es un login 'local'
      beforeCreate: async (user) => {
        if (user.authType === 'local' && user.password) {
          const salt = await bcrypt.genSalt(8);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });

  // Método para comparar contraseñas
  User.prototype.comparePassword = async function(candidatePassword) {
    // Solo compara si el usuario tiene una contraseña hasheada
    if (this.authType === 'local' && this.password) {
        return await bcrypt.compare(candidatePassword, this.password);
    }
    return false;
  };

  return User;
};