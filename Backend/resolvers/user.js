export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll()
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id)
    },
    me: async (parent, args, { me }) => {
      return await models.User.findByPk(me.id)
    }
  },
  User: {
    items: async (user, args, { models }) => {
      return await models.Item.findAll({
        where: {
          userId: user.id
        }
      })
    }
  }
}
