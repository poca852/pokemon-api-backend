const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const Pokemons = sequelize.define('Pokemons', {
   id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
   },

   name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
   },

   hp: {
      type: DataTypes.INTEGER
   },

   attack: {
      type: DataTypes.INTEGER
   },

   defense: {
      type: DataTypes.INTEGER
   },

   speed: {
      type: DataTypes.INTEGER
   },

   height: {
      type: DataTypes.INTEGER
   },

   weight: {
      type: DataTypes.INTEGER
   },

   img: {
      type: DataTypes.STRING
   },

   types: {
      type: DataTypes.STRING
   },

   db: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
   }
});

module.exports = Pokemons;