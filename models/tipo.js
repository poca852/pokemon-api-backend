const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const Tipos = sequelize.define('Tipos', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },

   nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
   },

   url: {
      type: DataTypes.STRING
   }
})

module.exports = Tipos
