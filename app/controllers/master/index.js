const schoolIdentityController = require('./SchoolIdentityController')
const curriculumController = require('./CurriculumController')
const academicYearController = require('./AcademicYearController')
const buildingController = require('./BuildingController')
const roomController = require('./RoomController')
const unitController = require('./UnitController')
const departmentController = require('./DepartmentController')
const classController = require('./ClassController')
const positionController = require('./PositionController')
const employeeStatusController = require('./EmployeeStatusController')
const classroomController = require('./ClassroomController')

const controllers = {
  schoolIdentityController,
  curriculumController,
  academicYearController,
  buildingController,
  roomController,
  unitController,
  departmentController,
  classController,
  positionController,
  employeeStatusController,
  classroomController,
}

module.exports = controllers
