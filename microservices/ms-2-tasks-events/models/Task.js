// models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  priority: {
    type: DataTypes.ENUM('alta', 'media', 'baja'),
    defaultValue: 'media',
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'en progreso', 'completada'),
    defaultValue: 'pendiente',
  }
}, {
  timestamps: true,
});

module.exports = Task;
