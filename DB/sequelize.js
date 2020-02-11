const Sequelize = require('sequelize');

// Follow this command: export DB_URL='mysql://user:pass@127.0.0.1:3306/hotel'
const sequelize = new Sequelize(process.env.DB_URL);

module.exports = sequelize;