'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inventories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      condition: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      source: {
        type: Sequelize.STRING,
      },
      receiptDate: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.addIndex('Inventories', ['code'], {
      unique: true,
      name: 'unique_index_code',
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Inventories')
    await queryInterface.removeIndex('Inventories', 'unique_index_code')
  },
}
