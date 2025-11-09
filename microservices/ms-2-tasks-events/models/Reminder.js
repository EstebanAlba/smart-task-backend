// models/Reminder.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Reminder = sequelize.define('Reminder', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  message: { type: DataTypes.STRING, allowNull: false },
  remindAt: { type: DataTypes.DATE, allowNull: false },
  taskId: { type: DataTypes.INTEGER, allowNull: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true,
});

module.exports = Reminder;
