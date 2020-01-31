const supplier = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    'supplier',
    {
      supplierName: {
        type: DataTypes.STRING,
        unique: false,
        validate: { notEmpty: true }
      }
    },
    { timestamps: false }
  )
  Supplier.associate = models => {
    Supplier.hasMany(models.Item)
  }
  return Supplier
}
export default supplier
