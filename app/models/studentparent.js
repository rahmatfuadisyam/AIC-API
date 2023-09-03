'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class StudentParent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentParent.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idStudent: DataTypes.UUID,
      fatherName: DataTypes.STRING,
      fatherBirthYear: DataTypes.INTEGER,
      fatherLastEducation: DataTypes.STRING,
      fatherOccupation: DataTypes.STRING,
      fatherIncome: DataTypes.STRING,
      fatherPhone: DataTypes.STRING,
      motherName: DataTypes.STRING,
      motherBirthYear: DataTypes.INTEGER,
      mothnerLastEducation: DataTypes.STRING,
      motherOccupation: DataTypes.STRING,
      motherIncome: DataTypes.STRING,
      motherPhone: DataTypes.STRING,
      guardName: DataTypes.STRING,
      guardBirthYear: DataTypes.INTEGER,
      guardLastEducation: DataTypes.STRING,
      guardOccupation: DataTypes.STRING,
      guardIncome: DataTypes.STRING,
      guardPhone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'StudentParent',
    }
  )

  StudentParent.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return StudentParent
}
