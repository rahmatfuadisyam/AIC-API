'use strict'
const { Model } = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (sequelize, DataTypes) => {
  class SchoolIdentity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SchoolIdentity.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      npsn: DataTypes.STRING,
      nss: DataTypes.STRING,
      address: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      phone: DataTypes.STRING,
      kelurahan: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kabupaten: DataTypes.STRING,
      province: DataTypes.STRING,
      website: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'SchoolIdentity',
    }
  )

  SchoolIdentity.beforeCreate((instance, options) => {
    instance.id = uuid()
  })
  return SchoolIdentity
}
