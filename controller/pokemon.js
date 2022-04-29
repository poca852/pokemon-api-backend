const axios = require('axios').default;

const { request, response } = require('express');
// helpers
const {  fetchPokemonApi, 
         fetchPokemonByName, 
         fetchPokemonByNameInDb, 
         fetchAllPokemonsDb} = require('../helpers/fetch');
const { Pokemons, Tipos } = require('../models');
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

const crearPokemon = async(req = request, res = response) => {
   const {types, ...body} = req.body;
   try {
      // verificamos que no exista en la pokeapi
      const verificarPokeApi = await fetchPokemonByName(body.name);
      if(verificarPokeApi){
         return res.status(400).json({
            ok: false,
            msg: `Ya existe el pokemon ${body.name}.`
         })
      }

      // verifico si existe en la base de datso
      const verficarPokeDb = await Pokemons.findOne({
         where: {name: body.name}
      })
      if(verficarPokeDb){
         return res.status(400).json({
            ok: false,
            msg: `Ya existe el pokemon ${body.name}.`
         })
      }

      // si no existe el pokemons lo creamos
      const newPokemon = await Pokemons.create(body)
      switch (types.length) {
         case 2:
            const tipo1 = await Tipos.findOne({where: {nombre: types[0]}});
            const tipo2 = await Tipos.findOne({where: {nombre: types[1]}});
            console.log(tipo2)
            await newPokemon.addTipos(tipo1);
            await newPokemon.addTipos(tipo2);
            break;

         case 1: 
            const tipo = await Tipos.findOne({where: {nombre: types[0]}})
            await newPokemon.addTipos(tipo)
            break;

         default:
            break;
      }

      res.status(201).json({
         ok: true,
         newPokemon
      })

   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   obtenerPokemons,
   obtenerPokemonByName,
   crearPokemon
}