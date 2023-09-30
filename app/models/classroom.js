'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Classroom.belongsTo(models.Unit, {
        as: 'unit',
        foreignKey: 'idUnit',
      })
      Classroom.belongsTo(models.Employee, {
        as: 'employee',
        foreignKey: 'idEmployee',
      })
      Classroom.belongsTo(models.Department, {
        as: 'department',
        foreignKey: 'idDepartment',
      })
      Classroom.belongsTo(models.Building, {
        as: 'building',
        foreignKey: 'idBuilding',
      })
      Classroom.belongsTo(models.Room, {
        as: 'room',
        foreignKey: 'idRoom',
      })
      Classroom.hasMany(models.LessonSchedule, { foreignKey: 'idClassroom' })
      Classroom.hasMany(models.ValueRange, { foreignKey: 'idClassroom' })
      Classroom.hasMany(models.StudentPresence, { foreignKey: 'idClassroom' })
      Classroom.hasMany(models.StudentGrades, { foreignKey: 'idClassroom' })
    }
  }
  Classroom.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idUnit: DataTypes.UUID,
      code: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      idEmployee: DataTypes.UUID,
      idDepartment: DataTypes.UUID,
      idBuilding: DataTypes.UUID,
      idRoom: DataTypes.UUID,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Classroom',
    }
  )

  Classroom.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return Classroom
}
