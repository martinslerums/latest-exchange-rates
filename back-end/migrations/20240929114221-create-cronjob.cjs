'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('Starting to create CronJobs table...');

    await queryInterface.createTable('CronJobs', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lastRunDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    console.log('CronJobs table created successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CronJobs');  
  },
};
