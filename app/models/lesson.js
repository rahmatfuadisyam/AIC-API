'use strict'
const { Model } = require('sequelize')
const uuidv4 = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lesson.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID for new instances
      },
      idUnit: DataTypes.UUID,
      idCurriculum: DataTypes.UUID,
      idDepartment: DataTypes.UUID,
      idEmployee: DataTypes.UUID,
      idLessonGroup: DataTypes.UUID,
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      level: DataTypes.STRING,
      basicCompetence: DataTypes.STRING,
      specialCompetence: DataTypes.STRING,
      hours: DataTypes.INTEGER,
      index: DataTypes.INTEGER,
      session: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Lesson',
    }
  )

  Lesson.beforeCreate((instance, options) => {
    instance.id = uuidv4()
  })
  return Lesson
}
