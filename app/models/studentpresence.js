'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class studentPresence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      studentPresence.belongsTo(models.Unit, {
        as: 'unit',
        foreignKey: 'idUnit',
      })
      studentPresence.belongsTo(models.AcademicYear, {
        as: 'academicYear',
        foreignKey: 'idAcademicYear',
      })
      studentPresence.belongsTo(models.Classroom, {
        as: 'classroom',
        foreignKey: 'idClassroom',
      })
      studentPresence.belongsTo(models.LessonSchedule, {
        as: 'lessonSchedule',
        foreignKey: 'idLessonSchedule',
      })
      studentPresence.belongsTo(models.LessonSchedule, {
        as: 'lessonSchedule',
        foreignKey: 'idLessonSchedule',
      })
      studentPresence.belongsTo(models.Employee, {
        as: 'employee',
        foreignKey: 'idEmployee',
      })
      studentPresence.belongsTo(models.Student, {
        as: 'student',
        foreignKey: 'idStudent',
      })
    }
  }
  studentPresence.init(
    {
      idUnit: DataTypes.UUID,
      idAcademicYear: DataTypes.UUID,
      idClassroom: DataTypes.UUID,
      idLessonSchedule: DataTypes.UUID,
      idEmployee: DataTypes.UUID,
      idStudent: DataTypes.UUID,
      presences: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'studentPresence',
    }
  )

  studentPresence.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return studentPresence
}
