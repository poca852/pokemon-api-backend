const { default: axios } = require("axios");
const { Pokemons, Tipos } = require("../models");
const baseUrl = process.env.POKEAPI;

const fetchPokemonApi = async (offset, limit) => {
   try {
      const resp = await axios.get(`${baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
      const data = await resp.data.results;
      return data;
   } catch (error) {
      console.log(error.message)
      throw new Error(error)
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
         nombre: data.nombre,
         altura: data.height,
         peso: data.weight,
         tipo,
         vida: data.stats[0].base_stat,
         ataque: data.stats[1].base_stat,
         defensa: data.stats[2].base_stat,
         velocidad: data.stats[5].base_stat,
         db: false
      };
   } catch (error) {
      console.log(error.message)
   }
}

const fetchPokemonByNameInDb = async(name) => {
   try {
      const pokemon = await Pokemons.findOne({
         where: {nombre: name},
         attributes: ['id', 'nombre', 'altura', 'peso', 'tipo', 'vida', 'ataque', 'defensa', 'velocidad', 'db'],
         include: {model: Tipos}
      })

      let tipo = []
      for (let i = 0; i < pokemon.Tipos.length; i++) {
         
         tipo.push(pokemon.Tipos[i].nombre)
         
      }

      return {
         id: pokemon.id,
         nombre: pokemon.nombre,
         vida: pokemon.vida,
         peso: pokemon.peso,
         tipo,
         ataque: pokemon.ataque,
         defensa: pokemon.defensa,
         velocidad: pokemon.velocidad,
         db: pokemon.db,
         altura: pokemon.altura
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
            'id', 'vida', 'nombre', 'peso', 'altura', 'ataque', 'velocidad', 'defensa', 'db'
         ]
      })

      return pokemons
   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   fetchPokemonApi,
   fetchPokemonByName,
   fetchPokemonByNameInDb,
   fetchAllPokemonsDb
}