const  { Router } = require('express')
require('dotenv').config();
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const router = Router();
const { Videogame, Genre } = require('../db.js');


router.get('/', async function (req, res) {
  const { name } = req.query;
  
  try {
    if (name) {
      let gamesDB = await Videogame.findOne({where: {name: name}, include: [Genre]});
      if (gamesDB){
          let X = gamesDB
          gamesDBFull = {
              id: X.id,
              name: X.name,
              background_image: X. background_image,
              rating: X.rating,
              source: "Created",
              genres: X.genres.map(p => p.name).join(', '),
          }
        let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`) 
        gamesAPIFull = gamesAPI.data.results.map((X) => {
          var game = {
            id: X.id,
            name: X.name,
            rating: X.rating,
            source: 'Api',
            background_image: X.background_image,
            genres: X.genres && X.genres.map((p) => p.name).filter(p => p != null).join(', '),
          };
          return game;
        })
        res.json(gamesAPIFull.concat(gamesDBFull))
      } else {
        let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`) 
        gamesAPIFull = gamesAPI.data.results.map((X) => {
          var game = {
            id: X.id,
            name: X.name,
            rating: X.rating,
            source: 'Api',
            background_image: X.background_image,
            genres: X.genres && X.genres.map((p) => p.name).filter(p => p != null).join(', '),
          };
          return game;
        })
        res.json(gamesAPIFull)
      }
    } else {
      let gamesResults = []
      let apiRAWG = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
      for (let index = 0; index < 5; index++) {
        let games = (await axios.get(apiRAWG)).data
        let dataGame = games.results.map((G) => {
          var game = {
            name: G.name,
            background_image: G.background_image,
            genres: G.genres.map((gen) => gen.name).filter(p => p != null).join(', '),
            source: "Api",
            id: G.id,
            rating: G.rating
          };
          return game
        })
        apiRAWG = games.next;
        gamesResults = gamesResults.concat(dataGame)
      }
      
      let dbGames = await Videogame.findAll({ include: [Genre] })
      let jsonGames = dbGames.map((J) => J.toJSON())
      jsonGames.forEach(C => {
        C.source = "Created", 
        C.genres = C.genres.map((genre) => genre.name).filter(p => p != null).join(', ')
      });
      gamesResults = gamesResults.concat(jsonGames)
    
      res.json(gamesResults)
    }
  } catch (err) {
    res.status(404).json({ err })
  }
});



/*    router.get('/', async (req, res) => {
    try{
     const api = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
     console.log(api)
     const formatear = api.data.results.map((vide) =>{
       const obj ={
        id: vide.id,
        name: vide.name,
        background_image: vide. background_image,
        rating: vide.rating,
        createdAt: vide.createdAt,
        updateAt: vide.updatedAt,
      
       }
       return obj;
     })
     const db = await Videogame.findAll({ include: [{model: Genre}]});
   
     const suma = [...formatear, ...db]
     res.json(suma)
   }catch (err) {
     console.log(err)
   }
   })
  */



/*   router.get("/", async (req, res, next) => {
    try {
      let name = req.query.name; 
      let videogameTotal = await getAllVideogames(); //Guardo mi controlador que trae todos los pokemons en una variable..
      if (name) { //Consulto si me pasan un nombre y lo busco en la variable de arriba
        let videogameName = await videogameTotal.filter((el) => el.name.toLowerCase() === (name.toLowerCase()));
        videogameName.length
          ? res.status(200).send(videogameName) // Si lo encuentro lo devuelvo,
          : res.status(404).send("El videogamer ingresado no existe"); // y sino devuelvo el texto.
      } else {
        res.status(200).send(videogameTotal); //Sino devuelvo todos los pokemons
      }
    } catch (error) {
      next(error);
    }
  }); */


router.get('/:id', async function (req, res) {
    const { id } = req.params;

    try { 
        if (id.includes("-")) {
            const gameDB = await Videogame.findOne({ where: {id},
                include: {model: Genre, attributes: ['name'],
                through: {attributes: []}}})
                let vide = gameDB
                const information = {
                    id: vide.id,
                    name: vide.name,
                    background_image: vide. background_image,
                    rating: vide.rating,
                    description: vide.description,
                    released: vide.released,
                    platforms: vide.platforms,
                    createdAt: vide.createdAt,
                    updateAt: vide.updatedAt,
                    genres: vide.genres.map(p => p.name).join(', ')
                }
                return res.json(information)
        } else {
            const gameAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
                    
                let X = gameAPI.data;
                const information = {
                    name: X.name,
                    background_image: X.background_image,
                    genres: X.genres && X.genres.map((p) =>
                        p.name).filter(p => p != null).join(', '),
                    description: X.description_raw,
                    released: X.released,
                    rating: X.rating,
                    platforms: X.platforms && X.platforms.map((p) =>
                        p.platform.name).filter(p => p != null).join(', ')
                }
                return res.json(information)
        }
    } catch (err) {
        res.status(404).json({ error: 'ID no encontrado' })
    }
})






    router.post('/', async (req, res) => {
    let { name, description, released, rating, background_image, genres, platforms } = req.body;
    if (!name || !description || !platforms) res.status(400).json({ msg: "Faltan datos" });
    platforms = platforms.join(', ')
    try {
        const gameCreated = await Videogame.findOrCreate({ //devuelvo un array (OJOOO!!!!)
                 where: {
                name,
                description,
                released,
                background_image,
                rating,
                platforms,
            } 
        })
        
        await gameCreated[0].setGenres(genres); // relaciono ID genres al juego creado
    } catch (err) {
        console.log(err);
    }
    res.send('Creado con éxito')
})  
  


/* router.post("/", async (req, res) => { 
    try {
      let {name, description, released, rating, genres, platforms } = req.body //Datos que necesito pedir
  
      const newVideo = await Pokemon.create({
        name,
        description,
        released,
        rating,
        platforms,
        
      });
  
      if (!name) return res.json({ info: "El nombre es obligatorio" });
  
      if(Array.isArray(genres) && genres.length){ //Consulto si lo que me llega en TYPES, es un arreglo y si tiene algo adentro.
        let dbGenre = await Promise.all( //Armo una variable que dentro tendra una resolucion de promesas
          genres.map((e) => { // Agarro la data de types y le hago un map para verificar que cada elemento exista en 
            return Genre.findOne({where:{ name: e}}) // nuestra tabla de tipos
          })
        )
       await newVideo.setGenres(dbGenre) //Una vez que se resuelva la promesa del Pokemon.create, le agrego los tipos
  
       return res.send("Videogame creado exitosamente");
      }
    } catch (err) {
      res.status(400).send("Error en data");
    }
  });  */


  
/*   //Search all videogames platforms
  router.get('/', async (req, res) => {  
      var apiresult = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${YOUR_API_KEY}`)
      var apivgplat = apiresult.data.results.map(p => p.name)
      res.send(apivgplat)
  })    
  module.exports = router */;


module.exports = router;