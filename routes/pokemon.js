const {Router} = require('express');
// controllers
const { obtenerPokemons, obtenerPokemonByName, crearPokemon, getTypes } = require('../controller/pokemon');

const router = Router();

router.post('/pokemons', crearPokemon)

router.get('/pokemons', obtenerPokemons);

router.get('/pokemon/name', obtenerPokemonByName);

router.get('/types', getTypes)

module.exports = router;