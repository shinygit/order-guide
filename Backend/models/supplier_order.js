const supplier_order = (sequelize, DataTypes) => {
  const Supplier_Order = sequelize.define('supplier_order', {
    wasOrderPlaced: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  })
  Supplier_Order.associate = (models) => {}
  return Supplier_Order
}
export default supplier_order
