const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require('../db.js');

//-----------------------------------------RoutesDog-----------------------------------------------
router.post('/dog', async (req, res) => {
    const { name, heightMin, heightMax, weightMin, weightMax, lifeSpan, image, temperament } = req.body
    try {
        let dogCreated = await Dog.create ({
            name, 
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            lifeSpan,
            image: image,
            createdInDb: true
        }) 
    
        let temperamentDb = await Temperament.findAll({
            where: { name: temperament }
        })
        dogCreated.addTemperament(temperamentDb);

        res.send(`La raza de perro ${req.body.name} fue creada con exito`);
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;