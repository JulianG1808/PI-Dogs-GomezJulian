const { Router } = require('express')
const router = Router()
const { Dog } = require('../db.js')

router.put('/:id', async (req, res) => {
  const {id} = req.params
  const { name, heightMin, heightMax, weightMin, weightMax, lifeSpan, image, temperament  } = req.body

  let condition = {}

  try {

    const dogsEdit = await Dog.findByPk(id)

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
    if(temperament){condition.temperament = temperament}

    await dogsEdit.update(condition)
    res.send(`La raza fue modificada con exito`)
  }
  catch {
    console.log(error)
  }
})

module.exports = router