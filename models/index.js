const TypeModel = require('./tipo');
const PokemonModel = require('./pokemon');

PokemonModel.belongsToMany(TypeModel, { through: 'pokemon_type' });
TypeModel.belongsToMany(PokemonModel, { through: 'pokemon_type' });

module.exports = {
   TypeModel,
   PokemonModel,
}