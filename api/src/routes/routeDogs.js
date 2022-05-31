const express = require('express');
const router = express.Router();
// const axios = require('axios')
// const {API_KEY} = process.env;

//importamos la DB
//const {Dog, Temperament} = require('../db.js')

//importamos los controllers
const {getAllDogs} = require('../controllers/controller.js')

//---------------------------------------RoutesDogs-----------------------------------------------
//route para /dogs y /dogs?name=
router.get('/dogs', async(req, res) => {
    const name = req.query.name
    try {
        let allDogs = await getAllDogs()
        if(name) { //si hay query
            let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            dogName.length ? 
            res.status(200).send(dogName) :
            res.status(404).send(`No se ha encontrado la raza de perro ${name}`)
        }
        else { //si no hay query
            res.status(200).send(allDogs)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/dogs/:idRaza', async(req, res) => {
    const {idRaza} = req.params
    
    try {
        let allDogs = await getAllDogs()
        if(idRaza) {
            let dog = await allDogs.filter(e => e.id == idRaza)
            dog.length ? 
            res.status(200).send(dog) : 
            res.status(404).send(`No se ha encontrado la raza con el id ${idRaza}`)
        }
    } catch (error) {
        res.status(404).send(error)
    }

})

module.exports = router;