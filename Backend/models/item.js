const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    itemName: {
      type: DataTypes.STRING,
      validate: { notEmpty: true }
    },
    orderAmount: {
      type: DataTypes.INTEGER
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      validate: { notEmpty: true, isDate: true }
    }
  })
  Item.associate = models => {
    Item.belongsTo(models.User)
  }
  return Item
}
export default item
