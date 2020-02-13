const Sequelize = require('sequelize');

const sequelize = require('../DB/sequelize');

const Roomer = sequelize.define('roomer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cpf: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  checkIn: {
    type: Sequelize.DATE,
    allowNull: false
  },
  checkOut: Sequelize.DATE
});

module.exports = Roomer;