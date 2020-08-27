'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buildTo: {
        type: Sequelize.INTEGER,
      },
      orderAmount: {
        type: Sequelize.INTEGER,
      },
      quantityOnHand: {
        type: Sequelize.INTEGER,
      },
      unitPriceInPennies: {
        type: Sequelize.INTEGER,
      },
      isMarketPrice: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isInfrequent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      productNumber: {
        type: Sequelize.STRING,
      },
      unitSize: {
        type: Sequelize.STRING,
      },
      quantityReceived: {
        type: Sequelize.INTEGER,
      },
      itemNote: {
        type: Sequelize.TEXT,
      },
      specialNote: {
        type: Sequelize.TEXT,
      },
      receivingNote: {
        type: Sequelize.TEXT,
      },
      flaggedByReceiver: {
        type: Sequelize.STRING,
      },
      receiverNote: {
        type: Sequelize.TEXT,
      },
      itemId: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        isUUID: 4,
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

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
}
