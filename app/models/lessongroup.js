'use strict'
const { Model } = require('sequelize')
const uuidv4 = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class LessonGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LessonGroup.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID for new instances
      },
      idUnit: DataTypes.UUID,
      type: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'LessonGroup',
    }
  )

  LessonGroup.beforeCreate((instance, options) => {
    instance.id = uuidv4()
  })
  return LessonGroup
}
