const express = require('express')
const router = express.Router()
const {
  studentController,
  studentParentController,
  employeeController,
} = require('../app/controllers/users')

router.post('/student', studentController.create) //insert
router.get('/student', studentController.read) //select all
router.get('/student/:id', studentController.read) //select by id
router.put('/student/:id', studentController.update) //update
router.delete('/student/:id', studentController.delete) //delete

router.post('/student-parent', studentParentController.create) //insert
router.get('/student-parent', studentParentController.read) //select all
router.get('/student-parent/:id', studentParentController.read) //select by id
router.put('/student-parent/:id', studentParentController.update) //update
router.delete('/student-parent/:id', studentParentController.delete) //delete

router.post('/employee', employeeController.create) //insert
router.get('/employee', employeeController.read) //select all
router.get('/employee/:id', employeeController.read) //select by id
router.put('/employee/:id', employeeController.update) //update
router.delete('/employee/:id', employeeController.delete) //delete

module.exports = router
