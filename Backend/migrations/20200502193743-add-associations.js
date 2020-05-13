'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'orders', // name of Source table
        'userId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', // name of Target table
            key: 'id' // key in Target model that we're referencing
          },
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ),
      queryInterface.addColumn(
        'suppliers', // name of Source table
        'userId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', // name of Target table
            key: 'id' // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ),
      queryInterface.addColumn(
        'locations', // name of Source table
        'userId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', // name of Target table
            key: 'id' // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ),
      queryInterface.addColumn(
        'items', // name of Source table
        'orderId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'orders', // name of Target table
            key: 'id' // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ),
      queryInterface.addColumn(
        'items', // name of Source table
        'supplierId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'suppliers', // name of Target table
            key: 'id' // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      ),
      queryInterface.addColumn(
        'items', // name of Source table
        'locationId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'locations', // name of Target table
            key: 'id' // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
