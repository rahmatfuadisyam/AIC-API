'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      idUnit: {
        type: Sequelize.UUID,
      },
      idClassroom: {
        type: Sequelize.UUID,
      },
      idDepartment: {
        type: Sequelize.UUID,
      },
      nipd: {
        type: Sequelize.STRING,
      },
      nisn: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      generation: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      rtrw: {
        type: Sequelize.STRING,
      },
      dusun: {
        type: Sequelize.STRING,
      },
      kelurahan: {
        type: Sequelize.STRING,
      },
      kecamatan: {
        type: Sequelize.STRING,
      },
      kabupaten: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.STRING,
      },
      initialStatus: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.STRING,
      },
      nik: {
        type: Sequelize.STRING,
      },
      birthPlace: {
        type: Sequelize.STRING,
      },
      birthDate: {
        type: Sequelize.DATEONLY,
      },
      gender: {
        type: Sequelize.STRING,
      },
      religion: {
        type: Sequelize.STRING,
      },
      specialNeeds: {
        type: Sequelize.STRING,
      },
      kindStay: {
        type: Sequelize.STRING,
      },
      transportation: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      skhun: {
        type: Sequelize.STRING,
      },
      kps: {
        type: Sequelize.BOOLEAN,
      },
      kpsNumber: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students')
  },
}
