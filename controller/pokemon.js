const { request, response } = require('express');
// helpers
const { fetchPokemonByName,
   fetchGetTypes,
   fetchAllPokes,
   nameSearchApi, 
   fetchId} = require('../helpers/fetch');
const { Pokemon, Type } = require('../models');

const obtenerPokemons = async (req = request, res = response) => {
   const { name, limit = 0, offset = 12 } = req.query
   try {
      if (name) {
         const pokemonApi = await nameSearchApi(name);
         if (pokemonApi) {
            res.status(200).json({
               ok: true,
               pokemonApi
            })
         }

         const pokemonDb = await Pokemon.findOne({
            where: { name },
            include: Type
         })
         if (pokemonDb) {
            res.status(200).json({
               ok: true,
               pokemonDb
            })
         }

         if (!pokemonApi || !pokemonDb) {
            res.status(404).json({
               ok: false,
               msg: `No existe el pokemon ${name}`
            })
         }
      } else {
         const pokemons = await fetchAllPokes(limit, offset)
         res.status(200).json({
            ok: true,
            pokemons
         })
      }
   } catch (error) {
      console.log(error)
   }

}

const obtenerPokemonById = async(req = request, res = response) => {
   const {id} = req.params;
   try {
      const pokemon = await fetchId(id);
      if(!pokemon){
         res.status(404).json({
            ok: false,
            msg: `No existe el pokemon con el id ${id}`
         })
      }

      res.status(200).json({
         ok: true,
         pokemon
      })
   } catch (error) {
      res.status(500).json({
         msg: 'Hable con el administrador'
      })
   }
}

const crearPokemon = async (req = request, res = response) => {
   const { types, ...body } = req.body;
   try {
      // verificamos que no exista en la pokeapi
      const verificarPokeApi = await nameSearchApi(body.name);
      if (verificarPokeApi) {
         return res.status(400).json({
            ok: false,
            msg: `Ya existe el pokemon ${body.name}.`
         })
      }

      // verifico si existe en la base de datso
      const verficarPokeDb = await Pokemon.findOne({
         where: { name: body.name }
      })
      if (verficarPokeDb) {
         return res.status(400).json({
            ok: false,
            msg: `Ya existe el pokemon ${body.name}.`
         })
      }

      // si no existe el pokemons lo creamos
      const newPokemon = await Pokemon.create(body)
      switch (types.length) {
         case 2:
            const tipo1 = await Type.findOne({ where: { name: types[0] } });
            const tipo2 = await Type.findOne({ where: { name: types[1] } });
            await newPokemon.addType(tipo1);
            await newPokemon.addType(tipo2);
            break;

         case 1:
            const tipo = await Type.findOne({ where: { name: types[0] } })
            await newPokemon.addType(tipo)
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

const getTypes = async (req = request, res = response) => {
   try {
      const pokeType = await fetchGetTypes()
      res.status(200).json(pokeType)
   } catch (error) {
      console.log(error)
      res.status(500).json({
         msg: 'Hable con el administrador'
      })
   }
}

module.exports = {
   obtenerPokemons,
   obtenerPokemonById,
   crearPokemon,
   getTypes
}