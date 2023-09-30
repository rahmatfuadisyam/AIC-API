'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Unit, {
        as: 'unit',
        foreignKey: 'idUnit',
      })
      Employee.belongsTo(models.PtkType, {
        as: 'ptkType',
        foreignKey: 'idPtkType',
      })
      Employee.belongsTo(models.EmployeeStatus, {
        as: 'employeeStatus',
        foreignKey: 'idEmployeeStatus',
      })
      Employee.belongsTo(models.Grade, {
        as: 'grade',
        foreignKey: 'idGrade',
      })
      Employee.hasOne(models.Classroom, { foreignKey: 'idEmployee' })
      Employee.hasMany(models.LessonSchedule, { foreignKey: 'idEmployee' })
      Employee.hasMany(models.StudentPresence, { foreignKey: 'idEmployee' })
      Employee.hasMany(models.EmployeePresence, { foreignKey: 'idEmployee' })
      Employee.hasMany(models.StudentGrades, { foreignKey: 'idEmployee' })
    }
  }
  Employee.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID for new instances
      },
      idUnit: DataTypes.UUID,
      nip: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      birthPlace: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      religion: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      rtrw: DataTypes.STRING,
      dusun: DataTypes.STRING,
      kelurahan: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kabupaten: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      nuptk: DataTypes.STRING,
      studyExpertise: DataTypes.STRING,
      idPtkType: DataTypes.UUID,
      optionalTask: DataTypes.STRING,
      idEmployeeStatus: DataTypes.UUID,
      activeStatus: DataTypes.BOOLEAN,
      marriageStatus: DataTypes.BOOLEAN,
      photo: DataTypes.STRING,
      nik: DataTypes.STRING,
      skCpns: DataTypes.STRING,
      cpnsDate: DataTypes.STRING,
      appointmentSk: DataTypes.STRING,
      appointmentTmt: DataTypes.STRING,
      appointmentAgency: DataTypes.STRING,
      idGrade: DataTypes.STRING,
      salarySource: DataTypes.STRING,
      laboratoryExpert: DataTypes.STRING,
      biologicalMotherName: DataTypes.STRING,
      spouseName: DataTypes.STRING,
      spouseNip: DataTypes.STRING,
      spouseWork: DataTypes.STRING,
      tmtPns: DataTypes.STRING,
      headmasterLicense: DataTypes.STRING,
      builtSchoolsCount: DataTypes.INTEGER,
      supervisionTraining: DataTypes.STRING,
      kkHandle: DataTypes.STRING,
      breileExpert: DataTypes.STRING,
      signLangExpert: DataTypes.STRING,
      citizenship: DataTypes.STRING,
      niynigk: DataTypes.STRING,
      npwp: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Employee',
    }
  )

  // Adding a "beforeCreate" hook to generate UUID for the "id" field
  Employee.beforeCreate((instance, options) => {
    instance.id = uuid()
  })

  return Employee
}
