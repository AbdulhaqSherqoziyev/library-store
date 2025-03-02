const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Publisher = sequelize.define('Publisher', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Publisher;