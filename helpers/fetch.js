const { PokemonModel, TypeModel } = require('../models');
const axios = require('axios').default;

const getAllTypes = async () => {
   try {
      const pokemonTypes = [];
      axios.get('https://pokeapi.co/api/v2/type')
         .then(types => {
            types.data.results.map(pokeType => pokemonTypes.push(pokeType.name))
         })
         .catch(e => console.log(e))

         pokemonTypes.map( async(pokeType) => {
            return await TypeModel.findOrCreate({
               where: {
                  name: pokeType
               }
            }).catch(e => console.log(e))
         })

         const allTypes = await TypeModel.findAll();
         return allTypes      
   } catch (error) {
      console.log(error)
   }
}

// ====================================== GET ALL POKEMONS ==================================
//                                              START

const queryDetail = async(urlPokemons) => {
   const pokemons = []
   for(let i = 0; i < urlPokemons.length; i++) {
      let pokemonDetail = await axios.get(urlPokemons[i])
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
   return pokemons
}

const getPokemonsInApi = async (offset, limit) => {
   try {
      const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
      let urlAllPokemons = pokemons.data.results.map(pokemon => pokemon.url)
      return await queryDetail(urlAllPokemons)
   } catch (e) {
      console.log(e)
   }
};

const getPokemonsInDb = async() => {
   return await PokemonModel.findAll({
      include: {
         model: TypeModel,
         attributes: ['name'],
         through: {
            attributes: []
         }
      }
   });
};

const getAllPokemons = async(limit, offset) => {
   const pokemonsInApi = await getPokemonsInApi(limit, offset);
   const pokemonsInDb = await getPokemonsInDb();
   const allPokemons = await pokemonsInApi.concat(pokemonsInDb);
   return allPokemons;
};

//                                              END
//============================================ GET ALL POKEMONS ===============================



//================================= GET POKEMON BY ID =========================== //
//                                        START

const getPokemonByIdInApi = async (id) => {
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

const getPokemonByIdInDb = async(id) => {
   try {
      const pokemon = await PokemonModel.findByPk(id, {
         include: {
            model: TypeModel,
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

const getPokemonById = async(id) => {
   const db = await getPokemonByIdInDb(id);
   if(db === undefined){
      return await getPokemonByIdInApi(id);
   }
   return db
}

//                                       END
//================================= GET POKEMON BY ID =========================== //

// ====================== GET POKEMONS BY NAME========================================= //
//                                START

const getPokemonByNameInApi = async (name) => {
   try {
      const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
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
   } catch  {
      return undefined
   }
}

const getPokemonByNameInDb = async(name) => {
   try {
      const pokemonInDb = await PokemonModel.findOne({
         where: {name},
         include: {
            model: TypeModel,
            attributes: ["name"],
            through: {
                attributes: []
            }
         }
      })
      return pokemonInDb
   } catch {
      return undefined
   }
}

const getPokemonByName = async(name) => {
   const pokemonByNameInApi = await getPokemonByNameInApi(name);
   if(pokemonByNameInApi === undefined){
      return await getPokemonByNameInDb(name);
   }

   return pokemonByNameInApi
}

//                               END
// ====================== GET POKEMONS BY NAME========================================= //



module.exports = {
   getAllTypes,
   getAllPokemons,
   getPokemonByName,
   getPokemonById
}