const express = require('express')
const router = express.Router()
const { schoolIdentityController } = require('../app/controllers/master')

router.post('/school-identity', schoolIdentityController.create) //insert

module.exports = router
