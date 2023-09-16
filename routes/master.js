const express = require('express')
const router = express.Router()
const {
  schoolIdentityController,
  curriculumController,
  academicYearController,
  buildingController,
  roomController,
  unitController,
  departmentController,
  gradeController,
  ptkTypeController,
  positionController,
  employeeStatusController,
  classroomController,
} = require('../app/controllers/master')

router.post('/school-identity', schoolIdentityController.create) //insert
router.get('/school-identity', schoolIdentityController.read) //select by id
router.get('/school-identity/:id', schoolIdentityController.read) //select by id
router.put('/school-identity/:id', schoolIdentityController.update) //update

router.post('/curriculum', curriculumController.create) //insert
router.get('/curriculum', curriculumController.read) //select all
router.get('/curriculum/:id', curriculumController.read) //select by id
router.put('/curriculum/:id', curriculumController.update) //update
router.delete('/curriculum/:id', curriculumController.delete) //delete

router.post('/academic-year', academicYearController.create) //insert
router.get('/academic-year', academicYearController.read) //select all
router.get('/academic-year/:id', academicYearController.read) //select by id
router.put('/academic-year/:id', academicYearController.update) //update
router.delete('/academic-year/:id', academicYearController.delete) //delete

router.post('/building', buildingController.create) //insert
router.get('/building', buildingController.read) //select all
router.get('/building/:id', buildingController.read) //select by id
router.put('/building/:id', buildingController.update) //update
router.delete('/building/:id', buildingController.delete) //delete

router.post('/room', roomController.create) //insert
router.get('/room', roomController.read) //select all
router.get('/room/:id', roomController.read) //select by id
router.put('/room/:id', roomController.update) //update
router.delete('/room/:id', roomController.delete) //delete

router.post('/unit', unitController.create) //insert
router.get('/unit', unitController.read) //select all
router.get('/unit/:id', unitController.read) //select by id
router.put('/unit/:id', unitController.update) //update
router.delete('/unit/:id', unitController.delete) //delete

router.post('/department', departmentController.create) //insert
router.get('/department', departmentController.read) //select all
router.get('/department/:id', departmentController.read) //select by id
router.put('/department/:id', departmentController.update) //update
router.delete('/department/:id', departmentController.delete) //delete

router.post('/grade', gradeController.create) //insert
router.get('/grade', gradeController.read) //select all
router.get('/grade/:id', gradeController.read) //select by id
router.put('/grade/:id', gradeController.update) //update
router.delete('/grade/:id', gradeController.delete) //delete

router.post('/ptk-type', ptkTypeController.create) //insert
router.get('/ptk-type', ptkTypeController.read) //select all
router.get('/ptk-type/:id', ptkTypeController.read) //select by id
router.put('/ptk-type/:id', ptkTypeController.update) //update
router.delete('/ptk-type/:id', ptkTypeController.delete) //delete

router.post('/position', positionController.create) //insert
router.get('/position', positionController.read) //select all
router.get('/position/:id', positionController.read) //select by id
router.put('/position/:id', positionController.update) //update
router.delete('/position/:id', positionController.delete) //delete

router.post('/employee-status', employeeStatusController.create) //insert
router.get('/employee-status', employeeStatusController.read) //select all
router.get('/employee-status/:id', employeeStatusController.read) //select by id
router.put('/employee-status/:id', employeeStatusController.update) //update
router.delete('/employee-status/:id', employeeStatusController.delete) //delete

router.post('/classroom', classroomController.create) //insert
router.get('/classroom', classroomController.read) //select all
router.get('/classroom/:id', classroomController.read) //select by id
router.put('/classroom/:id', classroomController.update) //update
router.delete('/classroom/:id', classroomController.delete) //delete

module.exports = router
