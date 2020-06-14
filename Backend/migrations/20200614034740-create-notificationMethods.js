'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('notificationMethods', {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          unique: false,
          allowNull: true,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          unique: false,
          allowNull: true,
        },
        confirmed: {
          type: Sequelize.BOOLEAN,
          unique: false,
          defaultValue: false,
          allowNull: false,
        },
        confirmationCode: {
          type: Sequelize.STRING,
          unique: false,
          allowNull: true,
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
      .then(() =>
        queryInterface.addConstraint(
          'notificationMethods',
          ['email', 'phoneNumber'],
          {
            type: 'check',
            where: {
              [Sequelize.Op.or]: [
                { email: { [Sequelize.Op.eq]: null } },
                { phoneNumber: { [Sequelize.Op.eq]: null } },
              ],
            },
          }
        )
      )
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
