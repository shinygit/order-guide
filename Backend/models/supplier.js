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
        'Saturday'
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
    salesPersonEmail: {
      type: DataTypes.STRING,
    },
  })

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Item)
    Supplier.belongsTo(models.User)
    //Supplier.belongsTo(models.Supplier_Order)
    Supplier.belongsToMany(models.Order, { through: models.Supplier_Order })
  }
  return Supplier
}

export default supplier
