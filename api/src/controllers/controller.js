const axios = require('axios')
const {Dog, Temperament} = require('../db.js')
const {API_KEY} = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//-------------------------------------------Controllers----------------------------------------------------
const getDogsApi = async () => { //traemos datos de la API
    const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)
    const dataApi = await urlApi.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            lifeSpan: e.life_span,
            weightMin: parseInt(e.weight.metric.slice(0, 2)),
            weightMax: parseInt(e.weight.metric.slice(4)),
            heightMin: parseInt(e.height.metric.slice(0, 2)),
            heightMax: parseInt(e.height.metric.slice(4)),
            temperaments: e.temperament ? e.temperament : null,
            image: e.image.url,
        }
    })
    return dataApi
}

const getDogsDb = async () => { //traemos datos de la base de datos
    return await Dog.findAll({
        include: {
            model:Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllDogs = async () => { //concatena los datos de la API y DB
    let dataApi = await getDogsApi()
    let dataDb = await getDogsDb()

    let dataTotal = dataApi.concat(dataDb)
    return dataTotal
}

module.exports = {getAllDogs};