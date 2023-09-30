'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class StudentPresence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentPresence.belongsTo(models.Unit, {
        as: 'unit',
        foreignKey: 'idUnit',
      })
      StudentPresence.belongsTo(models.AcademicYear, {
        as: 'academicYear',
        foreignKey: 'idAcademicYear',
      })
      StudentPresence.belongsTo(models.Classroom, {
        as: 'classroom',
        foreignKey: 'idClassroom',
      })
      StudentPresence.belongsTo(models.LessonSchedule, {
        as: 'lessonSchedule',
        foreignKey: 'idLessonSchedule',
      })
      StudentPresence.belongsTo(models.Employee, {
        as: 'employee',
        foreignKey: 'idEmployee',
      })
      StudentPresence.belongsTo(models.Student, {
        as: 'student',
        foreignKey: 'idStudent',
      })
    }
  }
  StudentPresence.init(
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
      modelName: 'StudentPresence',
    }
  )

  StudentPresence.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return StudentPresence
}
