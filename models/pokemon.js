const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const PokemonModel = sequelize.define('pokemon', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true
   },

   name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },

   hp: {
      type: DataTypes.FLOAT(1),
      validate: {
         min: 1,
         max: 250
      }
   },

   attack: {
      type: DataTypes.FLOAT(1),
      validate: {
         min: 1,
         max: 250
      }
   },

   defense: {
      type: DataTypes.FLOAT(1),
      validate: {
         min: 1,
         max: 250
      }
   },

   speed: {
      type: DataTypes.FLOAT(1),
      validate: {
         min: 1,
         max: 250
      }
   },

   height: {
      type: DataTypes.INTEGER
   },

   weight: {
      type: DataTypes.INTEGER
   },

   img: {
      type: DataTypes.TEXT,
      defaultValue: 'https://www.academiadebomberos.org.ar/wp-content/uploads/2016/05/imagen-provisoria-a-falta-de-foto.jpg'
   },

   db: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
   }
}, {timestamps: false});

module.exports = PokemonModel;