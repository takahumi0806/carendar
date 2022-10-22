'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Users', [
      { name: 'testa',  mail: 'aaa@gmail.com', password: 'aaaaaa', passwordconfirm: 'aaaaaa', createdAt: now, updatedAt: now},
      { name: 'testb',  mail: 'bbb@gmail.com', password: 'bbbbbb', passwordconfirm: 'bbbbbb', createdAt: now, updatedAt: now},
      { name: 'testc',  mail: 'ccc@gmail.com', password: 'cccccc', passwordconfirm: 'cccccc',createdAt: now, updatedAt: now},
      { name: 'testd',  mail: 'ddd@gmail.com', password: 'dddddd', passwordconfirm: 'dddddd',createdAt: now, updatedAt: now},
      { name: 'teste',  mail: 'eee@gmail.com', password: 'eeeeee', passwordconfirm: 'eeeeee', createdAt: now, updatedAt: now},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};