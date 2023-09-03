const express = require('express')
const router = express.Router()
const { authController } = require('../app/controllers')

router.post('/login', authController.login)
router.post('/validation', authController.validate)
router.post('/profile', authController.profile)
router.post('/logout', authController.logout)

module.exports = router
