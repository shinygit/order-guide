'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('suppliers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      supplierName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
      },
      deliveryDay: {
        type: Sequelize.ENUM(
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ),
      },
      salesPersonName: {
        type: Sequelize.STRING,
      },
      salesPersonPhoneNumber: {
        type: Sequelize.STRING,
      },
      officePhoneNumber: {
        type: Sequelize.STRING,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
}
