const express = require('express');
const cors = require('cors');
const sequelize = require('../database/config');

class Server {
   constructor(){
      this.app = express();
      this.port = process.env.PORT;
      this.paths = {
         pokemons: '/api/pokemons'
      }

      // metodos
      this.dbConnection();
      this.middlewares();
      this.routes();
   }

   // DB
   async dbConnection(){
      try {
         await sequelize.authenticate()
         // await sequelize.sync({force: true})
      } catch (error) {
         console.log(error.message)
      }
   }

   // MIDDLEWARES
   middlewares(){
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.static('public'));
   }

   routes(){
      this.app.use(this.paths.pokemons, require('../routes/pokemon'));
   }

   listen(){
      this.app.listen(this.port)
   }
}

module.exports = Server;