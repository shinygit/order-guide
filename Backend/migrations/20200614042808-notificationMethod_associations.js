'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'notificationMethods', // name of Source table
        'userId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', // name of Target table
            key: 'id', // key in Target model that we're referencing
          },
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      )
      .then(() => {
        return queryInterface.addConstraint(
          'notificationMethods',
          ['userId', 'email', 'phoneNumber'],
          {
            type: 'unique',
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
