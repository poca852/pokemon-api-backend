const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('pockemons', 'postgres', 'Au229497', {
   host: 'localhost',
   dialect: 'postgres',
   logging: false,
   native: false
});

module.exports = sequelize;