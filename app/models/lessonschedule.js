'use strict'
const { Model } = require('sequelize')
const uuidv4 = require('uuidv4')

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
    instance.id = uuidv4()
  })
  return LessonSchedule
}
