const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('pockemons', 'postgres', 'Au229497', {
   host: 'localhost',
   dialect: 'postgres'
});

module.exports = sequelize;