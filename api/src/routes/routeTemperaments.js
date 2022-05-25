const express = require('express');
const router = express.Router();
const axios = require('axios')
const {API_KEY} = process.env;

//importamos la DB
const {Temperament} = require('../db.js')

//importamos los controllers
//const {getAllDogs} = require('../controllers/controller.js')

//---------------------------------------RoutesTemps-----------------------------------------------
router.get('/temperament', async (req, res) => {
    const infoApi = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)

    try {//                                    devuele un temperament(string)          recorre el string y lo separa en un arr por palabra individual              
        let allTemperament = infoApi.data.map(e => e.temperament? e.temperament : 'no temperament').map(e => e.split(', '))

        let eachTemperament = [...new Set(allTemperament.flat())]
        eachTemperament.forEach(el => {
            Temperament.findOrCreate({
                where: {name: el}
            })
        })

        eachTemperament = await Temperament.findAll()
        res.status(200).send(eachTemperament)
    }
    catch (error){
        res.status(404).send(error)
    }
})

module.exports = router;