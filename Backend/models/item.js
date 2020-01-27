const Sequelize = require('sequelize')
const item = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'item',
    {
      itemName: {
        type: DataTypes.STRING,
        validate: { notEmpty: true }
      },
      supplier: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      buildTo: {
        type: DataTypes.INTEGER
      },
      orderAmount: {
        type: DataTypes.INTEGER
      },
      orderDate: {
        type: DataTypes.DATEONLY,
        validate: { notEmpty: true, isDate: true }
      },
      itemID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
      }
    },
    { timestamps: false }
  )
  Item.associate = models => {
    Item.belongsTo(models.User)
  }
  return Item
}
export default item
