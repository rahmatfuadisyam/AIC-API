'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('members', [{
      name: 'Asrarul Ikram',
      phone: '082293321281',
      email: 'hello.asrarulikram@gmail.com',
      username: 'ikram',
      password: bcrypt.hashSync('123456',bcrypt.genSaltSync(8)),
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'Ikram',
      phone: '089637032464',
      email: 'eternanymous@gmail.com',
      username: 'qwerty',
      password: bcrypt.hashSync('123456',bcrypt.genSaltSync(8)),
      createdAt : new Date(),
      updatedAt : new Date(),
    }, {
      name: 'Jon',
      phone: '08114411110',
      email: 'jon@gmail.com',
      username: 'jon',
      password: bcrypt.hashSync('123456',bcrypt.genSaltSync(8)),
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('members', [{
      username :'ikram'
    }])
  }
};
