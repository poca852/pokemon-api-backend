const { request, response } = require('express');
const { PokemonModel, TypeModel } = require('../models');

// helpers
const { getAllTypes,
   getAllPokemons,
   getPokemonByName,
   getPokemonById } = require('../helpers/fetch');

const getPokemons = async (req = request, res = response) => {
   const { name, limit = 0, offset = 12 } = req.query
   try {
      if (name) {
         const pokemonByName = await getPokemonByName(name)
         if(!pokemonByName){
            return res.status(404).json({
               ok: false,
               msg: `No existe el pokemon ${name}`
            })
         }

         return res.status(200).json({
            ok: true,
            pokemonByName
         })
      } else {
         const allPokemons = await getAllPokemons(limit, offset)
         res.status(200).json({
            ok: true,
            allPokemons
         })
      }
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }

}

const getPokemonId = async (req = request, res = response) => {
   const { id } = req.params;
   try {
      const pokemon = await getPokemonById(id);
      if (!pokemon) {
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
         msg: 'Hable con el administrador id'
      })
   }
}

const newPokemon = async (req = request, res = response) => {
   const { types, ...body } = req.body;
   try {
      // verificamos que no exista en la pokeapi
      const existePokemon = await getPokemonByName(body.name);
      if(existePokemon){
         return res.status(400).json({
            ok: false,
            msg: `Ya existe el pokemon ${body.name}`
         })
      }

      // si no existe el pokemons lo creamos
      const pokemonNew = await PokemonModel.create(body)
      switch (types.length) {
         case 2:
            const tipo1 = await TypeModel.findOne({ where: { name: types[0] } });
            const tipo2 = await TypeModel.findOne({ where: { name: types[1] } });
            await pokemonNew.addType(tipo1);
            await pokemonNew.addType(tipo2);
            break;

         case 1:
            const tipo = await TypeModel.findOne({ where: { name: types[0] } })
            await pokemonNew.addType(tipo)
            break;

         default:
            break;
      }

      res.status(201).json({
         ok: true,
         pokemonNew
      })

   } catch (error) {
      console.log(error)
   }
}

const getTypes = async (req = request, res = response) => {
   try {
      const type = await getAllTypes()
      console.log(type)
      res.status(200).json(type)
   } catch (error) {
      console.log(error)
      res.status(500).json({
         msg: 'Hable con el administrador'
      })
   }
}

module.exports = {
   getPokemons,
   getPokemonId,
   newPokemon,
   getTypes
}