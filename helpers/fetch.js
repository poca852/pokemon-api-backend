const { Type, Pokemon } = require('../models');
const axios = require('axios').default;

const fetchGetTypes = async () => {
   try {
      const pokeTypes = [];
      await axios.get('https://pokeapi.co/api/v2/type')
         .then(apiTypes => {
            apiTypes.data.results.map(pt => pokeTypes.push(pt.name))
         })
         .catch(e => console.log(e))

      const types = pokeTypes.map(async (pt) => {
         return await Type.findOrCreate({
            where: {
               name: pt
            }
         })
      })
      console.log(types)

      const allPokeTypes = await Type.findAll();
      return allPokeTypes
   } catch (error) {
      console.log(error)
   }
}

const queryDetail = async(arr) => {
   const pokemons = []
   for(let i = 0; i < arr.length; i++) {
      let pokemonDetail = await axios.get(arr[i])
      console.log(pokemonDetail)
      pokemons.push({
         id: pokemonDetail.data.id,
         name: pokemonDetail.data.name,
         hp: pokemonDetail.data.stats[0].base_stat,
         attack: pokemonDetail.data.stats[1].base_stat,
         defense: pokemonDetail.data.stats[2].base_stat,
         speed: pokemonDetail.data.stats[5].base_stat,
         height: pokemonDetail.data.height,
         weight: pokemonDetail.data.weight,
         types: pokemonDetail.data.types.map(pt => pt.type),
         img: pokemonDetail.data.sprites.other.home.front_default,
         db: false
      })
   }
   console.log(pokemons)
   return pokemons
}

const fetchGetApi = async (offset, limit) => {

   try {
      const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
      let pokeData = pokemons.data.results.map(pokemon => pokemon.url)
      console.log('pokeData', pokeData)
      pokeData = pokeData.splice(offset, limit)
      return await queryDetail(pokeData)
   } catch (e) {
      console.log(e)
   }
};

const fetchGetDB = async () => {
   return await Pokemon.findAll({
      include: Type,
   });
};

const fetchAllPokes = async (limit, offset) => {
   const api = await fetchGetApi(limit, offset);
   const db = await fetchGetDB();
   const pokes = await db.concat(api)
   return pokes;
};

const nameSearchApi = async (name) => {
   try {
      const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const pokemon = await resp.data;
      return pokemon
   } catch (error) {

   }
}

const idFetchApi = async (id) => {
   try {
      const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const pokemon = await resp.data;
      return {
         id: pokemon.id,
         name: pokemon.name,
         hp: pokemon.stats[0].base_stat,
         attack: pokemon.stats[1].base_stat,
         defense: pokemon.stats[2].base_stat,
         speed: pokemon.stats[5].base_stat,
         height: pokemon.height,
         weight: pokemon.weight,
         types: pokemon.types.map(pt => pt.type),
         img: pokemon.sprites.other.home.front_default,
      }
   } catch (error) {
      console.log(error)
   }
}

const idFetchDb = async(id) => {
   try {
      const pokemon = await Pokemon.findByPk(id, {
         include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
      })
      return pokemon
   } catch  {
      return undefined
   }
}

const fetchId = async(id) => {
   const db = await idFetchDb(id);
   if(db  === undefined){
      return await idFetchApi(id);
   }
   return db
}

module.exports = {
   fetchGetTypes,
   fetchAllPokes,
   nameSearchApi,
   // idFetchApi,
   // idFetchDb
   fetchId
}