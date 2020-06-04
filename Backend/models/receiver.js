import bcrypt from 'bcryptjs'

const receiver = (sequelize, DataTypes) => {
  const Receiver = sequelize.define('receiver', {
    receiverName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: { notEmpty: true },
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    receivesForUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true },
    },
  })

  Receiver.associate = (models) => {
    Receiver.belongsTo(models.User)
  }
  Receiver.beforeCreate(async (receiver) => {
    receiver.password = await receiver.generatePasswordHash()
  })

  Receiver.prototype.generatePasswordHash = async function () {
    const saltRounds = 12
    return await bcrypt.hash(this.password, saltRounds)
  }

  Receiver.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  Receiver.findByLogin = async (login) => {
    login = login.toLowerCase()
    const receiver = await Receiver.findOne({
      where: { login: login },
    })
    return receiver
  }
  Receiver.associate = (models) => {
    Receiver.belongsTo(models.User, { foreignKey: 'receivesForUser' })
  }
  return Receiver
}

export default receiver
