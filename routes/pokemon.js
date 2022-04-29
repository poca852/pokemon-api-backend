const {Router} = require('express');
// controllers
const { obtenerPokemons, obtenerPokemonByName } = require('../controller/pokemon');

const router = Router();

router.get('/pokemons', obtenerPokemons);

router.get('/pokemon/name', obtenerPokemonByName);

module.exports = router;