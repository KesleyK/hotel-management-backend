const Sequelize = require('sequelize');

const sequelize = require('../DB/sequelize');

const Room = sequelize.define('room', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  dailyRate: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  description: Sequelize.STRING
});

module.exports = Room;