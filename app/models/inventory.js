'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inventory.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      condition: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      source: DataTypes.STRING,
      receiptDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Inventory',
    }
  )

  Inventory.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return Inventory
}
