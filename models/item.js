const Sequelize = require('sequelize')
const item = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'item',
    {
      itemName: {
        type: DataTypes.STRING,
        validate: { notEmpty: true }
      },
      buildTo: {
        type: DataTypes.INTEGER
      },
      orderAmount: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      itemId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
      }
    },
    { timestamps: false }
  )
  Item.associate = models => {
    Item.belongsTo(models.Order, { onDelete: 'CASCADE' })
    Item.belongsTo(models.Location)
    Item.belongsTo(models.Supplier)
  }
  return Item
}
export default item