const express = require('express');
const router = express.Router();

// Importar todos los routers
const dogs = require('./routeDogs');
const temperaments = require('./routeTemperaments');
const postDog = require('./routeDog');

//Routes
router.use('/dogs', dogs); 
router.use('/temperaments', temperaments);
router.use('/dog', postDog)

module.exports = router;


// 
// ------------------------------------------ANTES DE MODULARIZAR------------------------------------------------------------------------
//


// const { Router } = require('express');
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');
// const axios = require('axios')
// const {Dog, Temperament} = require('../db.js')
// const {API_KEY} = process.env;
// const router = Router();
// require('dotenv').config();
// const { getAllDogs } = require('../controllers/controller.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// //-------------------------------------------Controllers----------------------------------------------------
// const getDogsApi = async () => { //traemos datos de la API
//     const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)
//     const dataApi = await urlApi.data.map(e => {
//         return {
//             id: e.id,
//             name: e.name,
//             life_span: e.life_span,
//             temperament: e.temperament,
//             origin: e.origin,
//             image: e.image.url,
//             weightMin: parseInt(e.weight.metric.slice(0, 2).trim()),
//             weightMax: parseInt(e.weight.metric.slice(4).trim()),
//             heightMin: parseInt(e.height.metric.slice(0, 2).trim()),
//             heightMax: parseInt(e.height.metric.slice(4).trim()),
//         }
//     })
//     return dataApi
// }

// const getDogsDb = async () => { //traemos datos de la base de datos
//     return await Dog.findAll({
//         include: {
//             model:Temperament,
//             attributes: ['name'],
//             through: {
//                 attributes: []
//             }
//         }
//     })
// }

// const getAllDogs = async () => { //concatena las datas traidas antes
//     let DataApi = await getDogsApi()
//     let dataDb = await getDogsDb()

//     let dataTotal = DataApi.concat(dataDb)
//     return dataTotal
// }
//---------------------------------------Routes-----------------------------------------------

//route para /dogs y /dogs?name=
// router.get('/dogs', async(req, res) => { // esta ruta devuelve todos los perros o devuelve uno en especifico en caso de que haya una query
//     const name = req.query.name
//     try {
//         let allDogs = await getAllDogs()
//         if(name) { //si hay query
//             let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
//             dogName.length ? 
//             res.status(200).send(dogName) :
//             res.status(404).send('No se ha encontrado el nombre de perro ingresado')
//         }
//         else { //si no hay query
//             res.status(200).send(allDogs)
//         }
//     } catch (error) {
//         res.status(404).send(error)
//     }
// })

// router.post('/dogs', async (req, res) => {
//     let {
//         name,
//         heightMin,
//         heightMax,
//         weightMin,
//         weightMax,
//         // life_span,
//         // origin,
//         // image,
//         temperament,
//     } = req.body;

//     let dogCreated = await Dog.create({
//         name,
//         heightMin,
//         heightMax,
//         weightMin,
//         weightMax,
//         // life_span: life_span + ' years',
//         // origin,
//         // image,
//     });

//     temperament?.forEach(async (temperament) => {
//         let temperamentDB = await Temperament.findAll({
//             where: {
//                 name: temperament,
//             }
//         })
//         dogCreated.addTemperamento(temperamentDB);
//     });
//     return res.send('Raza creada con exito')
// })

// router.get('/dogs/:idRaza', async(req, res) => {
//     const {idRaza} = req.params

//     try {
//         let allDogs = await getAllDogs()
    
//         if(idRaza) {
//             let dog = allDogs.find(e => e.id.toString() === idRaza)
//             res.status(200).send(dog)  
//         }
//         else res.status(404).send('No se ha encontrado la raza')
//     } catch (error) {
//         res.status(404).send(error)
//     }

// })

// router.get('/temperament', async (req, res) => {
//     const infoApi = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)

//     try {
//         let allTemperament = infoApi.data.map(e => e.temperament ? e.temperament : 'vacio').map(e => e.split(', '))

//         let eachTemperament = [...new Set(allTemperament.flat())]
//         eachTemperament.forEach(el => {
//             Temperament.findOrCreate({
//                 where: {name: el}
//             })
//         })

//         eachTemperament = await Temperament.findAll()
//         res.status(200).send(eachTemperament)
//     }
//     catch (error){
//         res.status(404).send(error)
//     }
// })

// module.exports = router;