const { Router } = require('express');
const router = Router();
const { Dog } = require('../db.js');

router.delete('/:id', async(req, res) => {
    try{
        const { id } = req.params

        const dogDelete = await Dog.findByPk(id)

        if(!dogDelete){
            res.status(404).send('No se encontró el id')
        }

        await dogDelete.destroy()

        res.send('El perro fue eliminado correctamente')
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router