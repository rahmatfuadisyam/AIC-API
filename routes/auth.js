const express = require('express')
const router = express.Router()
const { authController } = require('../app/controllers')

router.post('/login', authController.login)
router.post('/validation', authController.validate)

module.exports = router