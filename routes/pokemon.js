const {Router} = require('express');
// controllers
const { obtenerPokemons, obtenerPokemonByName, crearPokemon } = require('../controller/pokemon');

const router = Router();

router.post('/pokemons', crearPokemon)

router.get('/pokemons', obtenerPokemons);

router.get('/pokemon/name', obtenerPokemonByName);

module.exports = router;