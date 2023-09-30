'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class employeePresence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employeePresence.belongsTo(models.Unit, {
        as: 'unit',
        foreignKey: 'idUnit',
      })
      employeePresence.belongsTo(models.AcademicYear, {
        as: 'academicYear',
        foreignKey: 'idAcademicYear',
      })
      employeePresence.belongsTo(models.Employee, {
        as: 'employee',
        foreignKey: 'idEmployee',
      })
    }
  }
  employeePresence.init(
    {
      idUnit: DataTypes.UUID,
      idAcademicYear: DataTypes.UUID,
      idEmployee: DataTypes.UUID,
      presences: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'employeePresence',
    }
  )

  employeePresence.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return employeePresence
}
