const Tipos = require('./tipo');
const Pokemons = require('./pokemon');

Pokemons.belongsToMany(Tipos, { through: 'Pokemon_Tipo' });
Tipos.belongsToMany(Pokemons, { through: 'Pokemon_Tipo' });

module.exports = {
   Tipos,
   Pokemons,
}