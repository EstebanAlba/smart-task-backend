// models/Event.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  location: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true,
});

module.exports = Event;
