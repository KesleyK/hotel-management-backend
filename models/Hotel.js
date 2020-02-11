const Sequelize = require('sequelize');

const sequelize = require('../DB/sequelize');

const Hotel = sequelize.define('hotel', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  local: {
    type: Sequelize.STRING,
    allowNull: false
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Hotel;