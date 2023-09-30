'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class AcademicYear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AcademicYear.hasMany(models.LessonSchedule, {
        foreignKey: 'idAcademicYear',
      })
      AcademicYear.hasMany(models.StudentPresence, {
        foreignKey: 'idAcademicYear',
      })
      AcademicYear.hasMany(models.EmployeePresence, {
        foreignKey: 'idAcademicYear',
      })
      AcademicYear.hasMany(models.StudentGrades, {
        foreignKey: 'idAcademicYear',
      })
    }
  }
  AcademicYear.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      code: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'AcademicYear',
    }
  )

  AcademicYear.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return AcademicYear
}
