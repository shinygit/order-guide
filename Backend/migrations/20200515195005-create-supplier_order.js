'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('supplier_orders', {
      wasOrderPlaced: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      wasOrderReceived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      additionalNotes: {
        type: Sequelize.TEXT,
      },
      supplierReceivingNotes: {
        type: Sequelize.TEXT,
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

  down: (queryInterface, Sequelize) => {},
}
