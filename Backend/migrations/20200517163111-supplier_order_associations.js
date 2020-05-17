'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'supplier_orders', // name of Source table
        'supplierId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'suppliers', // name of Target table
            key: 'id', // key in Target model that we're referencing
          },
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ),
      queryInterface.addColumn(
        'supplier_orders', // name of Source table
        'orderId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'orders', // name of Target table
            key: 'id', // key in Target model that we're referencing
          },
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ),
    ]).then(() => {
      queryInterface.addConstraint(
        'supplier_orders',
        ['supplierId', 'orderId'],
        {
          type: 'primary key',
          name: 'supplier_orders_pkey',
        }
      )
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
