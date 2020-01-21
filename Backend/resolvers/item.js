const uuid = require('uuid')
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isItemOwner } from './authorization'

export default {
  Query: {
    items: async (parent, args, { models }) => {
      return await models.Item.findAll()
    },
    item: async (parent, { id }, { models }) => {
      return await models.Item.findByPk(id)
    }
  },
  Mutation: {
    createItem: combineResolvers(
      isAuthenticated,
      async (parent, { itemName }, { me, models }) => {
        return await models.Item.create({
          itemName,
          userId: me.id
        })
      }
    ),
    deleteItem: combineResolvers(
      isAuthenticated,
      isItemOwner,
      async (parent, { id }, { models }) => {
        return await models.Item.destroy({ where: { id } })
      }
    )
  },
  Item: {
    userId: async (item, args, { models }) => {
      return await models.User.findByPk(item.userId)
    }
  }
}
