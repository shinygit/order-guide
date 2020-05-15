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
  })
  Order.associate = (models) => {
    Order.hasMany(models.Item)
    Order.belongsTo(models.User)
    // Order.belongsTo(models.Supplier_Order)
    Order.belongsToMany(models.Supplier, { through: models.Supplier_Order })
  }
  return Order
}
export default order
