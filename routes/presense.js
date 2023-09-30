const express = require('express')
const router = express.Router()
const {
  studentPresenceController,
  employeePresenceController,
  studentGradeController,
} = require('../app/controllers/presence')

router.post('/student-presence', studentPresenceController.create) //insert
router.get('/student-presence', studentPresenceController.read) //select all
router.get('/student-presence/:id', studentPresenceController.read) //select by id
router.put('/student-presence/:id', studentPresenceController.update) //update
router.delete('/student-presence/:id', studentPresenceController.delete) //delete

router.post('/employee-presence', employeePresenceController.create) //insert
router.get('/employee-presence', employeePresenceController.read) //select all
router.get('/employee-presence/:id', employeePresenceController.read) //select by id
router.put('/employee-presence/:id', employeePresenceController.update) //update
router.delete('/employee-presence/:id', employeePresenceController.delete) //delete

router.post('/student-grade', studentGradeController.create) //insert
router.get('/student-grade', studentGradeController.read) //select all
router.get('/student-grade/:id', studentGradeController.read) //select by id
router.put('/student-grade/:id', studentGradeController.update) //update
router.delete('/student-grade/:id', studentGradeController.delete) //delete

module.exports = router
