const express = require('express')
const router = express.Router()
const {
  lessonGroupController,
  lessonController,
  lessonScheduleController,
  valueRangeController,
} = require('../app/controllers/academic')

router.post('/lesson-group/', lessonGroupController.create) //insert
router.get('/lesson-group/', lessonGroupController.read) //select all
router.get('/lesson-group/:id', lessonGroupController.read) //select by id
router.put('/lesson-group/:id', lessonGroupController.update) //update
router.delete('/lesson-group/:id', lessonGroupController.delete) //delete

router.post('/lesson/', lessonController.create) //insert
router.get('/lesson/', lessonController.read) //select all
router.get('/lesson/:id', lessonController.read) //select by id
router.put('/lesson/:id', lessonController.update) //update
router.delete('/lesson/:id', lessonController.delete) //delete

router.post('/lesson-schedule/', lessonScheduleController.create) //insert
router.get('/lesson-schedule/', lessonScheduleController.read) //select all
router.get('/lesson-schedule/:id', lessonScheduleController.read) //select by id
router.put('/lesson-schedule/:id', lessonScheduleController.update) //update
router.delete('/lesson-schedule/:id', lessonScheduleController.delete) //delete

router.post('/value-range/', valueRangeController.create) //insert
router.get('/value-range/', valueRangeController.read) //select all
router.get('/value-range/:id', valueRangeController.read) //select by id
router.put('/value-range/:id', valueRangeController.update) //update
router.delete('/value-range/:id', valueRangeController.delete) //delete

module.exports = router
