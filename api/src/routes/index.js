const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogames = require('./videogames');
//const videogame = require('./videogame');
const genres = require('./genres');
//const getAll = require('./getAll');
const router = Router();




//Configuro todos los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res) => {
    res.send('Holaaa')
});
router.use('/videogames', videogames);
router.use('/genres', genres);


module.exports = router;








module.exports = router;