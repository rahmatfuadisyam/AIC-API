'use strict'
const { Model } = require('sequelize')
const uuidv4 = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class ValueRange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ValueRange.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID for new instances
      },
      idUnit: DataTypes.UUID,
      idClassroom: DataTypes.UUID,
      from: DataTypes.INTEGER,
      to: DataTypes.INTEGER,
      grade: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ValueRange',
    }
  )

  ValueRange.beforeCreate((instance, options) => {
    instance.id = uuidv4()
  })
  return ValueRange
}
