const { request, response } = require('express');
// helpers
const {  fetchPokemonApi, 
         fetchPokemonByName, 
         fetchPokemonByNameInDb, 
         fetchAllPokemonsDb} = require('../helpers/fetch');
// const { Pokemons, Tipos } = require('../models');

const obtenerPokemons = async (req = request, res = response) => {
   const { offset = 0, limit = 12, name } = req.query;
   try {
      const pokemonsApi = await fetchPokemonApi(offset, limit);
      const pokemonsDb = await fetchAllPokemonsDb();
      
      res.status(200).json({
         ok: true,
         pokemonsApi,
         pokemonsDb
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

const obtenerPokemonByName = async (req = request, res = response) => {
   const { name } = req.query;
   try {
      if (name) {
         const pokemonApi = await fetchPokemonByName(name);
         if (pokemonApi) {
            return res.status(200).json({
               ok: true,
               pokemonApi
            })
         }

         const pokemonDb = await fetchPokemonByNameInDb(name);
         if (pokemonDb) {
            return res.status(200).json({
               ok: true,
               pokemonDb
            })
         }

         if(!pokemonApi || !pokemonDb){
            return res.status(404).json({
               ok: false,
               msg: 'sin resultados'
            })
         }
      }
   } catch (error) {
      res.status(404).json({
         ok: false,
         msg: 'No se encontro ningun pokemon con su busqueda'
      })
   }
}

module.exports = {
   obtenerPokemons,
   obtenerPokemonByName
}