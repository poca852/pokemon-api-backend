const axios = require("axios").default;
const { Pokemons, Tipos } = require("../models");
const baseUrl = process.env.POKEAPI;

const fetchPokemonApi = async (offset, limit) => {
   try {
      const resp = await axios.get(`${baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
      const data = await resp.data.results;
      return data;
   } catch (error) {
      console.log(error.message)
   }
}

const fetchPokemonByName = async (name) => {
   try {
      const resp = await axios.get(`${baseUrl}/pokemon/${name}`);
      const data = await resp.data;
      let tipo = []

      for (let i = 0; i < data.types.length; i++) {
         tipo.push(data.types[i].type.name)
      }

      return {
         id: data.id,
         name: data.name,
         height: data.height,
         weight: data.weight,
         tipo,
         hp: data.stats[0].base_stat,
         attack: data.stats[1].base_stat,
         defense: data.stats[2].base_stat,
         speed: data.stats[5].base_stat,
         db: false
      };
   } catch (error) {
      console.log(error.message)
   }
}

const fetchPokemonByNameInDb = async(name) => {
   try {
      const pokemon = await Pokemons.findOne({
         where: {name},
         attributes: ['id', 'name', 'height', 'weight', 'hp', 'attack', 'defense', 'speed', 'db'],
         include: {model: Tipos}
      })

      let types = []
      for (let i = 0; i < pokemon.Tipos.length; i++) {
         
         types.push(pokemon.Tipos[i].nombre)
         
      }

      return {
         id: pokemon.id,
         name: pokemon.name,
         hp: pokemon.hp,
         weight: pokemon.weight,
         types,
         attack: pokemon.attack,
         defense: pokemon.defense,
         speed: pokemon.speed,
         db: pokemon.db,
         height: pokemon.height
      }

   } catch (error) {
      console.log(error.message);
   }
}

const fetchAllPokemonsDb = async() => {
   try {
      const pokemons = await Pokemons.findAll({
         include: {model: Tipos, attributes: ['nombre']},
         attributes: [
            'id', 'hp', 'name', 'weight', 'height', 'attack', 'speed', 'defense', 'db'
         ]
      })

      return pokemons
   } catch (error) {
      console.log(error)
   }
}

const fetchTypes = async() => {
   const types = await Tipos.findAll();
   const resp = await axios.get(types.url)
   const allTypes = resp.data.types.map(async(t) => {
      const resp = await axios.get(t.url)
      
   })
   
}

module.exports = {
   fetchPokemonApi,
   fetchPokemonByName,
   fetchPokemonByNameInDb,
   fetchAllPokemonsDb
}