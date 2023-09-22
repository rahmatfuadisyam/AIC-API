'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      idUnit: {
        type: Sequelize.UUID,
      },
      nip: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
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
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
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
      nuptk: {
        type: Sequelize.STRING,
      },
      studyExpertise: {
        type: Sequelize.STRING,
      },
      idPtkType: {
        type: Sequelize.UUID,
      },
      optionalTask: {
        type: Sequelize.STRING,
      },
      idEmployeeStatus: {
        type: Sequelize.UUID,
      },
      activeStatus: {
        type: Sequelize.BOOLEAN,
      },
      marriageStatus: {
        type: Sequelize.BOOLEAN,
      },
      photo: {
        type: Sequelize.STRING,
      },
      nik: {
        type: Sequelize.STRING,
      },
      skCpns: {
        type: Sequelize.STRING,
      },
      cpnsDate: {
        type: Sequelize.STRING,
      },
      appointmentSk: {
        type: Sequelize.STRING,
      },
      appointmentTmt: {
        type: Sequelize.STRING,
      },
      appointmentAgency: {
        type: Sequelize.STRING,
      },
      idGrade: {
        type: Sequelize.UUID,
      },
      salarySource: {
        type: Sequelize.STRING,
      },
      laboratoryExpert: {
        type: Sequelize.STRING,
      },
      biologicalMotherName: {
        type: Sequelize.STRING,
      },
      spouseName: {
        type: Sequelize.STRING,
      },
      spouseNip: {
        type: Sequelize.STRING,
      },
      spouseWork: {
        type: Sequelize.STRING,
      },
      tmtPns: {
        type: Sequelize.STRING,
      },
      headmasterLicense: {
        type: Sequelize.STRING,
      },
      builtSchoolsCount: {
        type: Sequelize.INTEGER,
      },
      supervisionTraining: {
        type: Sequelize.STRING,
      },
      kkHandle: {
        type: Sequelize.STRING,
      },
      breileExpert: {
        type: Sequelize.STRING,
      },
      signLangExpert: {
        type: Sequelize.STRING,
      },
      citizenship: {
        type: Sequelize.STRING,
      },
      niynigk: {
        type: Sequelize.STRING,
      },
      npwp: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Employees')
  },
}
