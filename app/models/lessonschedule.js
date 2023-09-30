'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class LessonSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LessonSchedule.belongsTo(models.Unit, {
        as: 'unit',
        foreignKey: 'idUnit',
      })
      LessonSchedule.belongsTo(models.AcademicYear, {
        as: 'academicYear',
        foreignKey: 'idAcademicYear',
      })
      LessonSchedule.belongsTo(models.Classroom, {
        as: 'classroom',
        foreignKey: 'idClassroom',
      })
      LessonSchedule.belongsTo(models.Lesson, {
        as: 'lesson',
        foreignKey: 'idLesson',
      })
      LessonSchedule.belongsTo(models.Room, {
        as: 'room',
        foreignKey: 'idRoom',
      })
      LessonSchedule.belongsTo(models.Employee, {
        as: 'employee',
        foreignKey: 'idEmployee',
      })
      LessonSchedule.hasMany(models.StudentPresence, {
        foreignKey: 'idLessonSchedule',
      })
      LessonSchedule.hasMany(models.StudentGrades, {
        foreignKey: 'idLessonSchedule',
      })
    }
  }
  LessonSchedule.init(
    {
      idUnit: DataTypes.UUID,
      idAcademicYear: DataTypes.UUID,
      idClassroom: DataTypes.UUID,
      idLesson: DataTypes.UUID,
      idRoom: DataTypes.UUID,
      idEmployee: DataTypes.UUID,
      parallelSchedule: DataTypes.STRING,
      serialSchedule: DataTypes.STRING,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      day: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'LessonSchedule',
    }
  )

  LessonSchedule.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return LessonSchedule
}
