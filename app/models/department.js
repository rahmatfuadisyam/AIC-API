'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Department.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      expertise: DataTypes.STRING,
      generalCompetence: DataTypes.STRING,
      specialCompetence: DataTypes.STRING,
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Department',
    }
  )

  Department.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return Department
}
