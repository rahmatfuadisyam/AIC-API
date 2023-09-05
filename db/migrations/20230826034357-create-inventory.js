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
      idUnit: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
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
      responsiblePerson: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      length: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      width: {
        type: Sequelize.INTEGER,
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
