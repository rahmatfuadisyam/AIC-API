'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Building, {
        as: 'building',
        foreignKey: 'idBuilding',
      })
      Room.hasMany(models.Classroom, { foreignKey: 'idRoom' })
      Room.hasMany(models.LessonSchedule, { foreignKey: 'idRoom' })
    }
  }
  Room.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idBuilding: DataTypes.UUID,
      code: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      lessonCapacity: DataTypes.INTEGER,
      testCapacity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  )

  Room.beforeCreate((instance, options) => {
    instance.id = uuid()
  })

  return Room
}
