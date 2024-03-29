const express = require('express');
const router = express.Router();

//importamos los controllers
const {getAllDogs} = require('../controllers/controller.js')

//---------------------------------------RoutesDogs-----------------------------------------------
//route para /dogs y /dogs?name=
router.get('/', async(req, res) => {
    const name = req.query.name
    try {
        let allDogs = await getAllDogs()
        if(name) { //si hay query
            let dogName = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase())) // or ===
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

router.get('/:idRaza', async(req, res) => {
    const {idRaza} = req.params
    
    try {
        let allDogs = await getAllDogs()
        if(idRaza) {
            let dog = await allDogs.filter(dog => dog.id == idRaza)
            dog.length ? 
            res.status(200).send(dog) : 
            res.status(404).send(`No se ha encontrado la raza con el id ${idRaza}`)
        }
    } catch (error) {
        res.status(404).send(error)
    }

})

module.exports = router;