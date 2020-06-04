const Sequelize = require('sequelize')
const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    buildTo: {
      type: DataTypes.INTEGER,
    },
    orderAmount: {
      type: DataTypes.INTEGER,
    },
    quantityOnHand: {
      type: DataTypes.INTEGER,
    },
    unitPriceInPennies: {
      type: DataTypes.INTEGER,
    },
    isMarketPrice: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    productNumber: {
      type: DataTypes.STRING,
    },
    unitSize: {
      type: DataTypes.STRING,
    },
    quantityReceived: {
      type: DataTypes.INTEGER,
    },
    itemNote: {
      type: DataTypes.TEXT,
    },
    specialNote: {
      type: DataTypes.TEXT,
    },
    receivingNote: {
      type: DataTypes.TEXT,
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      isUUID: 4,
    },
    flaggedByReceiver: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiverNote: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  })
  Item.associate = (models) => {
    Item.belongsTo(models.Order, { onDelete: 'CASCADE' })
    Item.belongsTo(models.Location)
    Item.belongsTo(models.Supplier)
  }
  return Item
}
export default item
