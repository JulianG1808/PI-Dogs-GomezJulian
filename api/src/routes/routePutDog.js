const { Router } = require('express')
const router = Router()
const { Dog, Temperament} = require('../db.js')
const { Op } = require("sequelize");

router.put('/:id', async (req, res) => {
  const {id} = req.params
  const { name, heightMin, heightMax, weightMin, weightMax, lifeSpan, image, temperament  } = req.body
  console.log('temperaments en el put: ', req.body.temperament)
  let condition = {}

  try {

    const dogsEdit = await Dog.findByPk(id)

    if(!dogsEdit) {
      res.status(404).send('No se encontró el id')
    }

    if(name){
      condition.name = name
    }
    else {
      condition.name = ''
    }

    if(heightMin){
      condition.heightMin = heightMin
    }
    else {
      condition.heightMin = ''
    }

    if(heightMax){
      condition.heightMax = heightMax
    }
    else {
      condition.heightMax = ''
    }
    
    if(weightMin){
      condition.weightMin = weightMin
    }
    else {
      condition.weightMin = ''
    }

    if(weightMax){
      condition.weightMax = weightMax
    }
    else {
      condition.weightMax = ''
    }

    if(lifeSpan){
      condition.lifeSpan = lifeSpan
    }
    else {
      condition.lifeSpan = ''
    }

    if(image){
      condition.image = image
    }
    else {
      condition.image = ''
    }

    if (temperament) {
      let temperamentDelete = await Temperament.findAll({
        where: { name: { [Op.notLike]: `${temperament}` } },
      });
      let temperamentDb = await Temperament.findAll({
        where: { name: temperament },
      });
      console.log(temperamentDelete)
      console.log(temperamentDb)

      await dogsEdit.removeTemperament(temperamentDelete);
      await dogsEdit.addTemperament(temperamentDb);
    }

    await dogsEdit.update(condition)
    res.send(`La raza fue modificada con exito`)
  }
  catch (error) {
    console.log(error)
  }
})

module.exports = router