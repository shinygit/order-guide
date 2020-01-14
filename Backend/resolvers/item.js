const uuid = require('uuid')
export default {
  Query: {
    items: (parent, args, { models }) => Object.values(models.items),
    item: (parent, { id }, { models }) => {
      return models.items[id]
    }
  },
  Mutation: {
    createItem: (parent, { itemName }, { me, models }) => {
      const id = uuid()
      const item = {
        id,
        itemName,
        userId: me.id
      }
      models.items[id] = item
      models.users[me.id].itemIds.push(id)
      return item
    },
    deleteItem: (parent, { id }, { models }) => {
      const { [id]: item, ...otherItems } = models.items

      if (!item) {
        return false
      }
      models.items = otherItems
      return true
    }
  },

  Item: {
    userId: (item, args, { models }) => {
      return models.users[item.userId]
    }
  }
}
