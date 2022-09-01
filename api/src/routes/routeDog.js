const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require('../db.js');

//-----------------------------------------RoutesDog-----------------------------------------------
router.post('/', async (req, res) => {
    const { name, heightMin, heightMax, weightMin, weightMax, lifeSpan, image, temperament } = req.body

    console.log(req.body.temperament)
    try {
        let createDog = await Dog.create ({
            name, 
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            lifeSpan,
            image,
            createdInDb: true
        }) 
    
        let temperamentDb = await Temperament.findAll({
            where: { name: temperament }
        })
        createDog.addTemperament(temperamentDb);

        res.send(`La raza de perro ${req.body.name} fue creada con exito`);
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;