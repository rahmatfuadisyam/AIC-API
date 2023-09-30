'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Unit.hasMany(models.Classroom, { foreignKey: 'idUnit' })
      Unit.hasMany(models.Department, { foreignKey: 'idUnit' })
      Unit.hasMany(models.Employee, { foreignKey: 'idUnit' })
      Unit.hasMany(models.Inventory, { foreignKey: 'idUnit' })
      Unit.hasMany(models.Lesson, { foreignKey: 'idUnit' })
      Unit.hasMany(models.LessonGroup, { foreignKey: 'idUnit' })
      Unit.hasMany(models.LessonSchedule, { foreignKey: 'idUnit' })
      Unit.hasMany(models.Student, { foreignKey: 'idUnit' })
      Unit.hasMany(models.ValueRange, { foreignKey: 'idUnit' })
      Unit.hasMany(models.StudentPresence, { foreignKey: 'idUnit' })
      Unit.hasMany(models.EmployeePresence, { foreignKey: 'idUnit' })
      Unit.hasMany(models.StudentGrades, { foreignKey: 'idUnit' })
    }
  }
  Unit.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      code: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      type: DataTypes.ENUM(['Pendidikan', 'Bisnis']),
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Unit',
    }
  )

  Unit.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return Unit
}
