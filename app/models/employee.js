'use strict'
const { Model } = require('sequelize')
const uuidv4 = require('uuidv4')

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
      photo: DataTypes.STRING,
      birth_place: DataTypes.STRING,
      birth_date: DataTypes.DATEONLY,
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
      postal_code: DataTypes.STRING,
      nuptk: DataTypes.STRING,
      study_expertise: DataTypes.STRING,
      ptk_type: DataTypes.UUID,
      optional_task: DataTypes.STRING,
      employee_status: DataTypes.UUID,
      active_status: DataTypes.STRING,
      marriage_status: DataTypes.STRING,
      photo: DataTypes.STRING,
      nik: DataTypes.STRING,
      sk_cpns: DataTypes.STRING,
      cpns_date: DataTypes.STRING,
      appointment_sk: DataTypes.STRING,
      appointment_tmt: DataTypes.STRING,
      appointment_agency: DataTypes.STRING,
      class: DataTypes.STRING,
      salary_source: DataTypes.STRING,
      laboratory_expert: DataTypes.STRING,
      biological_mother_name: DataTypes.STRING,
      spouse_name: DataTypes.STRING,
      spouse_nip: DataTypes.STRING,
      spouse_work: DataTypes.STRING,
      tmt_pns: DataTypes.STRING,
      headmaster_license: DataTypes.STRING,
      built_schools_count: DataTypes.STRING,
      supervision_training: DataTypes.STRING,
      kk_handle: DataTypes.STRING,
      breile_expert: DataTypes.STRING,
      sign_lang_expert: DataTypes.STRING,
      citizenship: DataTypes.STRING,
      niy: DataTypes.STRING,
      nigk: DataTypes.STRING,
      npwp: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Employee',
    }
  )

  // Adding a "beforeCreate" hook to generate UUID for the "id" field
  Employee.beforeCreate((instance, options) => {
    instance.id = uuidv4()
  })

  return Employee
}
