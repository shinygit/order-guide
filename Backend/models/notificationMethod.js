const Sequelize = require('sequelize')
const notificationMethod = (sequelize, DataTypes) => {
  const NotificationMethod = sequelize.define('notificationMethod', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: 'notificationMethods_userId_email_phoneNumber_key',
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: 'notificationMethods_userId_email_phoneNumber_key',
      allowNull: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      unique: false,
      defaultValue: false,
      allowNull: false,
    },
    confirmationCode: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    confirmationAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    confirmationSentAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: 'notificationMethods_userId_email_phoneNumber_key',
    },
  })
  NotificationMethod.associate = (models) => {
    NotificationMethod.belongsTo(models.User)
  }
  return NotificationMethod
}
export default notificationMethod
