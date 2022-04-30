const {Router} = require('express');
const {Type} = require('../models')
// controllers
const { obtenerPokemons, obtenerPokemonById, crearPokemon, getTypes } = require('../controller/pokemon');

const router = Router();

router.post('/', crearPokemon)

router.get('/', obtenerPokemons);

router.get('/:id', obtenerPokemonById);

router.get('/types', getTypes)

module.exports = router;