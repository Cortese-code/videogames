const  express = require('express')
require('dotenv').config();
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const router = express.Router();
const {  Genre } = require('../db.js')



router.get("/", async (req, res, next) => {
    try {
      const api = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
      const genres = await api.data // trae la respuesta en data
      for (genre of genres.results) { //Entra a la propiedad results, a cada elemento..
        const find = await Genre.findOne({ where: {name: genre.name, id: genre.id}}); // Entra a la propiedad name y busca si ya existe 
        if (!find)  { // Si no lo encuentra..
          await Genre.create({ name: genre.name, id: genre.id}); //Lo agrega a la base de datos
        } else {
          return res.json(await Genre.findAll()) // Sino devuelve todos los genre
        }
      }
      res.json(await Genre.findAll()); //Finalmente devuelvo todos los genre de la Db.
    } catch (error) {
      next(error);
    }
  });
   
  
  
  module.exports = router;