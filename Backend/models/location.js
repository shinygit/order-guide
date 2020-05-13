const location = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'location',
    {
      locationName: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: { notEmpty: true }
      }
    },
    { timestamps: false }
  )
  Location.associate = models => {
    Location.hasMany(models.Item)
    Location.belongsTo(models.User)
  }
  return Location
}
export default location
