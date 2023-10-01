'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.Unit, {
        as: 'unit',
        foreignKey: 'idUnit',
      })
      Student.belongsTo(models.Classroom, {
        as: 'classroom',
        foreignKey: 'idClassroom',
      })
      Student.belongsTo(models.Department, {
        as: 'department',
        foreignKey: 'idDepartment',
      })
      Student.hasOne(models.StudentParent, { foreignKey: 'idStudent' })
      Student.hasMany(models.StudentPresence, { foreignKey: 'idStudent' })
      Student.hasMany(models.StudentGrades, { foreignKey: 'idStudent' })
    }
  }
  Student.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      idUnit: DataTypes.UUID,
      idClassroom: DataTypes.UUID,
      idDepartment: DataTypes.UUID,
      nipd: { type: DataTypes.STRING, unique: true },
      nisn: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      generation: DataTypes.INTEGER,
      address: DataTypes.STRING,
      rtrw: DataTypes.STRING,
      dusun: DataTypes.STRING,
      kelurahan: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kabupaten: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      initialStatus: DataTypes.STRING,
      photo: DataTypes.STRING,
      nik: DataTypes.STRING,
      birthPlace: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      religion: DataTypes.STRING,
      specialNeeds: DataTypes.STRING,
      kindStay: DataTypes.STRING,
      transportation: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      skhun: DataTypes.STRING,
      kps: DataTypes.BOOLEAN,
      kpsNumber: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Student',
    }
  )

  Student.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return Student
}
