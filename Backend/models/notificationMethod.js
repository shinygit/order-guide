const notificationMethod = (sequelize, DataTypes) => {
  const NotificationMethod = sequelize.define('notificationMethod', {
    email: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: false,
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
  })
  NotificationMethod.associate = (models) => {
    NotificationMethod.belongsTo(models.User)
  }
  return NotificationMethod
}
export default notificationMethod
