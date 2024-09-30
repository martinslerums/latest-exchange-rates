'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Currencies', [
      {
        base_currency: 'EUR',
        target_currency: 'USD',
        description: 'Euro to US Dollar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        base_currency: 'EUR',
        target_currency: 'AUD',
        description: 'Euro to Australian Dollar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        base_currency: 'EUR',
        target_currency: 'GBP',
        description: 'Euro to British Pound',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Currencies', null, {});
  },
};
