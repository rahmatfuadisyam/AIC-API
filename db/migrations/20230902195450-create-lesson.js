'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lessons', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      idUnit: {
        type: Sequelize.UUID,
      },
      idCurriculum: {
        type: Sequelize.UUID,
      },
      idDepartment: {
        type: Sequelize.UUID,
      },
      idEmployee: {
        type: Sequelize.UUID,
      },
      idLessonGroup: {
        type: Sequelize.UUID,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.STRING,
      },
      basicCompetence: {
        type: Sequelize.STRING,
      },
      specialCompetence: {
        type: Sequelize.STRING,
      },
      hours: {
        type: Sequelize.INTEGER,
      },
      index: {
        type: Sequelize.INTEGER,
      },
      session: {
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
    await queryInterface.dropTable('Lessons')
  },
}
