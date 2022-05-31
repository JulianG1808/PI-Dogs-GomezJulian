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

    // let tempsRepeated = await infoApi.data.map(e => e.temperament).toString().split(',')
    // //["Stubborn," , " Curious"]
    // const tempsSeparate = await tempsRepeated.map(e => {
    //     if(e[0] == ' '){
    //         return e.split('')
    //     }
    //     return e
    // })
    // //
    // const tempsUnited = await tempsSeparate.map(e => {
    //     if(Array.isArray(e)){
    //         e.shift()
    //         return e.join('')
    //     }
    //     return e
    // })

    //     await tempsUnited.forEach(el => {
    //         if(el != '') {
    //             Temperament.findOrCreate({
    //                 where: {name: el}
    //             })
    //         }
    //     })

    //     const allTemperaments = await Temperament.findAll()
    //     res.status(200).send(allTemperaments)

    try {             
        let allTemperament = infoApi.data.map(e => e.temperament? e.temperament : 'no temperament').map(e => e.split(', '))

        let eachTemperament = allTemperament.flat()
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