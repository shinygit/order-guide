const category = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'category',
    {
      categoryName: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    { timestamps: false }
  )
  Category.associate = (models) => {
    Category.hasMany(models.Item)
    Category.belongsTo(models.User)
  }
  return Category
}
export default category
