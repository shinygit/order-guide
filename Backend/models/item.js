const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    itemName: {
      type: DataTypes.STRING
    }
  })
  Item.associate = models => {
    Item.belongsTo(models.User)
  }
  return Item
}
export default item
