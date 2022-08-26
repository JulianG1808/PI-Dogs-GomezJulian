const { Router } = require('express')
const router = Router()
const { Dog, Temperament} = require('../db.js')

router.put('/:id', async (req, res) => {
  const {id} = req.params
  const { name, heightMin, heightMax, weightMin, weightMax, lifeSpan, image, temperament  } = req.body
  console.log('temperaments en el put: ', req.body.temperament)
  let condition = {}

  try {

    const dogsEdit = await Dog.findByPk(id)
    const oldTemperament = temperament

    if(!dogsEdit) {
      res.status(404).send('No se encontró el id')
    }

    if(name){condition.name = name}
    if(heightMin){condition.heightMin = heightMin}
    if(heightMax){condition.heightMax = heightMax}
    if(weightMin){condition.weightMin = weightMin}
    if(weightMax){condition.weightMax = weightMax}
    if(lifeSpan){condition.lifeSpan = lifeSpan}
    if(image){condition.image = image}
    let temperamentDb = await Temperament.findAll({
    where: { name: temperament }
    })


    await dogsEdit.update(condition)
    await dogsEdit.addTemperament(temperamentDb)
    res.send(`La raza fue modificada con exito`)
  }
  catch (error) {
    console.log(error)
  }
})

module.exports = router