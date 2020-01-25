const uuid = require('uuid')
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isItemOwner } from './authorization'
import pubsub, { EVENTS } from '../subscription'

export default {
  Query: {
    items: combineResolvers(
      isAuthenticated,
      async (parent, args, { me, models }) => {
        return await models.Item.findAll({
          where: {
            userId: me.id
          }
        })
      }
    ),
    item: combineResolvers(
      isAuthenticated,
      isItemOwner,
      async (parent, { id }, { models }) => {
        return await models.Item.findByPk(id)
      }
    )
  },
  Mutation: {
    createItem: combineResolvers(
      isAuthenticated,
      async (parent, { itemName, orderDate }, { me, models }) => {
        return await models.Item.create({
          itemName,
          orderDate,
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
    ),
    updateItem: combineResolvers(
      isAuthenticated,
      isItemOwner,
      async (parent, { id, orderAmount }, { models }) => {
        return await models.Item.update(
          { orderAmount: orderAmount },
          { where: { id: id }, returning: true }
        ).then(item => {
          return item[1][0].dataValues
        })
      }
    )
  },
  Item: {
    userId: async (item, args, { models }) => {
      return await models.User.findByPk(item.userId)
    }
  },
  Subscription: {
    orderChanged: {
      subscribe: () => pubsub.asyncIterator(EVENTS.ITEM.CHANGED)
    }
  }
}
