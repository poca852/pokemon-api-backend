const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const Type = sequelize.define('type', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
   },

   name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   }
}, {timestamps: false})

module.exports = Type
