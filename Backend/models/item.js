const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('item'', {
    text:{
      type:DataType.STRING
    }
  })
  Item.associate = models => {
    Item.belongsTo(models.User)
  }
  return Item
}