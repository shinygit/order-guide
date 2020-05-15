const order = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notEmpty: true, isDate: true },
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    orderPlacedWithSupplier: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  })
  Order.associate = (models) => {
    Order.hasMany(models.Item)
    Order.belongsTo(models.User)
  }
  return Order
}
export default order
