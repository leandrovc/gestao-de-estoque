'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Materials', [{
      description: 'Adesivo massa epóxi 100g',
      group: 'ADES',
      code: '1002',
      currentQuantity: 4,
      minimumQuantity: 1,
      unit: 'pc'
    },
    {
      description: 'Cabo flexível 450v/750v 4mm² - AZUL',
      group: 'ELET',
      code: '3001',
      currentQuantity: 0,
      minimumQuantity: 0,
      unit: 'm'
    },
    {
      description: 'Carboplástico massa asfáltica p/ reparos tipo 2 4kg ',
      group: 'IMPE',
      code: '10001',
      currentQuantity: 24,
      minimumQuantity: 0,
      unit: 'pc'
    }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Materials', null, {})
  }
}
