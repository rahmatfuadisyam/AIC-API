'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class Building extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Building.hasMany(models.Room, { foreignKey: 'idBuilding' })
      Building.hasMany(models.Classroom, { foreignKey: 'idBuilding' })
    }
  }
  Building.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      code: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      floor: DataTypes.INTEGER,
      length: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      width: DataTypes.INTEGER,
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Building',
    }
  )

  Building.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return Building
}
