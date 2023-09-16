'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LessonSchedules', {
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
      idLesson: {
        type: Sequelize.UUID,
      },
      idRoom: {
        type: Sequelize.UUID,
      },
      idEmployee: {
        type: Sequelize.UUID,
      },
      parallelSchedule: {
        type: Sequelize.STRING,
      },
      serialSchedule: {
        type: Sequelize.STRING,
      },
      startTime: {
        type: Sequelize.TIME,
      },
      endTime: {
        type: Sequelize.TIME,
      },
      day: {
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
    await queryInterface.dropTable('LessonSchedules')
  },
}
