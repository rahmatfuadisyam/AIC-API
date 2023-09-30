'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class EmployeePresence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EmployeePresence.belongsTo(models.Unit, {
        as: 'unit',
        foreignKey: 'idUnit',
      })
      EmployeePresence.belongsTo(models.AcademicYear, {
        as: 'academicYear',
        foreignKey: 'idAcademicYear',
      })
      EmployeePresence.belongsTo(models.Employee, {
        as: 'employee',
        foreignKey: 'idEmployee',
      })
    }
  }
  EmployeePresence.init(
    {
      idUnit: DataTypes.UUID,
      idAcademicYear: DataTypes.UUID,
      idEmployee: DataTypes.UUID,
      presences: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'EmployeePresence',
    }
  )

  EmployeePresence.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return EmployeePresence
}
