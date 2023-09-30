'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentGrades', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      idUnit: {
        type: Sequelize.UUID,
      },
      idAcademicYear: {
        type: Sequelize.UUID,
      },
      idClassroom: {
        type: Sequelize.UUID,
      },
      idLessonSchedule: {
        type: Sequelize.UUID,
      },
      idEmployee: {
        type: Sequelize.UUID,
      },
      idStudent: {
        type: Sequelize.UUID,
      },
      assignGrade: {
        type: Sequelize.FLOAT,
      },
      quizGrade: {
        type: Sequelize.FLOAT,
      },
      midGrade: {
        type: Sequelize.FLOAT,
      },
      finalGrade: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('StudentGrades')
  },
}
