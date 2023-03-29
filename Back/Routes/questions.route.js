const express = require('express')
const router = express.Router()
const Controller = require('../Controllers/question.controller')

router.post('/', Controller.create)
router.get('/:id', Controller.get)
router.get('/', Controller.list)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)
router.put('/:id/restore', Controller.restore)

module.exports = router