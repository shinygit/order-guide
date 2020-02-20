const order = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'order',
    {
      orderDate: {
        type: DataTypes.DATEONLY,
        validate: { notEmpty: true, isDate: true }
      }
    },
    { timestamps: false }
  )
  Order.associate = models => {
    Order.hasMany(models.Item, { onDelete: 'CASCADE' })
    Order.belongsTo(models.User)
  }
  return Order
}
export default order
