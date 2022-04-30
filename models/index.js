const Type = require('./tipo');
const Pokemon = require('./pokemon');

Pokemon.belongsToMany(Type, { through: 'pokemon_type' });
Type.belongsToMany(Pokemon, { through: 'pokemon_type' });

module.exports = {
   Type,
   Pokemon,
}