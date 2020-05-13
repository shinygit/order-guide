const supplier = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('supplier', {
    supplierName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: { notEmpty: true },
    },
    deliveryDay: {
      type: DataTypes.ENUM(
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Satuday'
      ),
    },
    salesPersonName: {
      type: DataTypes.STRING,
    },
    salesPersonPhoneNumber: {
      type: DataTypes.STRING,
    },
    officePhoneNumber: {
      type: DataTypes.STRING,
    },
  })

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Item)
    Supplier.belongsTo(models.User)
  }
  return Supplier
}

export default supplier
