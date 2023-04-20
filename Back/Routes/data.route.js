const express = require('express')
const router = express.Router()
const Controller = require('../Controllers/data.controller')

router.get('/', Controller.getDeedCategory)
router.get('/:id', Controller.getAllDeedTypeByCategoryId)
router.get('/:id', Controller.deedInstruments)

module.exports = router
