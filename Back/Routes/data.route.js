const express = require('express')
const router = express.Router()
const Controller = require('../Controllers/data.controller')


router.get('/', Controller.getInstrument)

router.get('/:id', Controller.getDeedTypes)

router.get('/Instrument/:id', Controller.getInstrument)

module.exports = router
