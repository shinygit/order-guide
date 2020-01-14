export default {
  Query: {
    //USERS
    users: (parent, args, { models }) => Object.values(models.users),
    user: (parent, { id }, { models }) => {
      return models.users[id]
    },
    me: (parent, args, { me }) => {
      return me
    }
  },
  User: {
    items: (user, args, { models }) => {
      return Object.values(models.items).filter(item => item.userId === user.id)
    }
  }
}
