import { UserInputError } from 'apollo-server-express'
import bcrypt from 'bcryptjs'

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 100]
      }
    }
  })

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash()
  })

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 12
    return await bcrypt.hash(this.password, saltRounds)
  }
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
  }
  User.associate = models => {
    User.hasMany(models.Order, { onDelete: 'CASCADE' })
    User.hasMany(models.Supplier, { onDelete: 'CASCADE' })
    User.hasMany(models.Location, { onDelete: 'CASCADE' })
  }

  User.findByLogin = async login => {
    login = login.toLowerCase()
    const user = await User.findOne({
      where: { email: login }
    })
    return user
  }

  return User
}
export default user
