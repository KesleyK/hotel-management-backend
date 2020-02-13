const Sequelize = require('sequelize');

const sequelize = require('../DB/sequelize');

const Service = sequelize.define('service', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = Service;