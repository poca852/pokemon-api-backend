const {Router} = require('express');
const {Type} = require('../models')
// controllers
const {  getPokemons, 
         getPokemonId, 
         newPokemon, 
         getTypes } = require('../controller/pokemon');

const router = Router();

router.post('/', newPokemon)

router.get('/', getPokemons);

router.get('/types', getTypes)

router.get('/:id', getPokemonId);

module.exports = router;