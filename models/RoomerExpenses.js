const Sequelize = require('sequelize');

const sequelize = require('../DB/sequelize');

const RoomerExpenses = sequelize.define('roomerExpenses', {
  dailyCosts: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  servicesCosts: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = RoomerExpenses;