'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class EmployeeStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EmployeeStatus.hasMany(models.Employee, {
        foreignKey: 'idEmployeeStatus',
      })
    }
  }
  EmployeeStatus.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EmployeeStatus',
    }
  )

  EmployeeStatus.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return EmployeeStatus
}
