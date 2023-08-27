const express = require('express')
const router = express.Router()
const { inventoryController } = require('../app/controllers')

router.post('/', inventoryController.create) //insert
router.get('/', inventoryController.read) //select all
router.get('/:id', inventoryController.read) //select by id
router.put('/:id', inventoryController.update) //update
router.delete('/:id', inventoryController.delete) //delete

module.exports = router
