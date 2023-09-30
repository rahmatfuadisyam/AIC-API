'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class StudentGrades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentGrades.belongsTo(models.Unit, {
        as: 'unit',
        foreignKey: 'idUnit',
      })
      StudentGrades.belongsTo(models.AcademicYear, {
        as: 'academicYear',
        foreignKey: 'idAcademicYear',
      })
      StudentGrades.belongsTo(models.Classroom, {
        as: 'classroom',
        foreignKey: 'idClassroom',
      })
      StudentGrades.belongsTo(models.LessonSchedule, {
        as: 'lessonSchedule',
        foreignKey: 'idLessonSchedule',
      })
      StudentGrades.belongsTo(models.Employee, {
        as: 'employee',
        foreignKey: 'idEmployee',
      })
      StudentGrades.belongsTo(models.Student, {
        as: 'student',
        foreignKey: 'idStudent',
      })
    }
  }
  StudentGrades.init(
    {
      idUnit: DataTypes.UUID,
      idAcademicYear: DataTypes.UUID,
      idClassroom: DataTypes.UUID,
      idLessonSchedule: DataTypes.UUID,
      idEmployee: DataTypes.UUID,
      idStudent: DataTypes.UUID,
      assignGrade: DataTypes.FLOAT,
      quizGrade: DataTypes.FLOAT,
      midGrade: DataTypes.FLOAT,
      finalGrade: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'StudentGrades',
    }
  )
  return StudentGrades
}
