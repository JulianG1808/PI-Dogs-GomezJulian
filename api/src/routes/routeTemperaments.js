const express = require('express');
const router = express.Router();
const axios = require('axios')
const {API_KEY} = process.env;

//importamos la DB
const {Temperament} = require('../db.js')

//importamos los controllers
//const {getAllDogs} = require('../controllers/controller.js')

//---------------------------------------RoutesTemps-----------------------------------------------
router.get('/temperaments', async (req, res) => {
    const infoApi = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)

    try {             
        let allTemperament = infoApi.data.map(dog => dog.temperament ? dog.temperament : 'no temperament').join(", ").split(", ")
        let filterTemperament = allTemperament.filter(temp => temp !== 'no temperament')

        let eachTemperament = [...new Set(filterTemperament)]
        eachTemperament.forEach(temp => {
            Temperament.findOrCreate({
                where: {name: temp}
            })
        })

        let temperamentDb = await Temperament.findAll()
        res.status(200).send(temperamentDb)
    }
    catch (error){
        res.status(404).send(error)
    }
})

module.exports = router;