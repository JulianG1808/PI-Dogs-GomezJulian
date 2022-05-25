const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require('../db.js');

//-----------------------------------------RoutesDog-----------------------------------------------
router.post('/dog', async (req, res) => {
    const { name, heightMin, heightMax, weightMin, weightMax, ageMin, ageMax, image, createdInDb, temperament } = req.body
    try {
        let dogCreated = await Dog.create ({
            name, 
            heightMin, // + ' cm',
            heightMax, // heightMax + ' cm', 
            weightMin, //weightMin + ' kg', 
            weightMax, //weightMax + ' kg', 
            ageMin, //ageMin + ' years', 
            ageMax, //ageMax + ' years', 
            image: image, 
            createdInDb: true,
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