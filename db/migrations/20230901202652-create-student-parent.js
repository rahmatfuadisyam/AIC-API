'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentParents', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      idStudent: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      fatherName: {
        type: Sequelize.STRING,
      },
      fatherBirthYear: {
        type: Sequelize.INTEGER,
      },
      fatherLastEducation: {
        type: Sequelize.STRING,
      },
      fatherOccupation: {
        type: Sequelize.STRING,
      },
      fatherIncome: {
        type: Sequelize.STRING,
      },
      fatherPhone: {
        type: Sequelize.STRING,
      },
      motherName: {
        type: Sequelize.STRING,
      },
      motherBirthYear: {
        type: Sequelize.INTEGER,
      },
      mothnerLastEducation: {
        type: Sequelize.STRING,
      },
      motherOccupation: {
        type: Sequelize.STRING,
      },
      motherIncome: {
        type: Sequelize.STRING,
      },
      motherPhone: {
        type: Sequelize.STRING,
      },
      guardName: {
        type: Sequelize.STRING,
      },
      guardBirthYear: {
        type: Sequelize.INTEGER,
      },
      guardLastEducation: {
        type: Sequelize.STRING,
      },
      guardOccupation: {
        type: Sequelize.STRING,
      },
      guardIncome: {
        type: Sequelize.STRING,
      },
      guardPhone: {
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
    await queryInterface.dropTable('StudentParents')
  },
}
