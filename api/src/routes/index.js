const express = require('express');
const router = express.Router();

// Importar todos los routers
const dogs = require('./routeDogs');
const temperaments = require('./routeTemperaments');
const postDog = require('./routeDog');
const deleteDog = require('./routeDelete.js')
const dogsEdit = require('./routePutDog')


//Routes
router.use('/dogs', dogs); 
router.use('/temperaments', temperaments);
router.use('/dog', postDog)
router.use('/clear', deleteDog)
router.use('/edit', dogsEdit)


module.exports = router;