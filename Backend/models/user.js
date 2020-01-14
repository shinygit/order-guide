import { UserInputError } from 'apollo-server-core'

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING
    }
  })

  User.associate = models => {
    User.hasMany(models.item, { onDelete: 'CASCASE' })
  }

  return UserInputError
}
export default user
