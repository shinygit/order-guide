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
      async (parent, { input }, { me, models }) => {
        console.log(input)
        const item = await models.Item.create({
          itemName: input.itemName,
          orderDate: input.orderDate,
          userId: me.id
        })
        return item
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
      async (parent, { id, input }, { models }) => {
        return await models.Item.update(
          { itemName: input.itemName },
          { where: { id: id }, returning: true }
        ).then(res => {
          let item = res[1][0].dataValues
          pubsub.publish(EVENTS.ITEM.CHANGED, {
            itemChanged: { item }
          })
          return item
        })
      }
    ),
    updateOrderAmount: combineResolvers(
      isAuthenticated,
      isItemOwner,
      async (parent, { id, orderAmount }, { models }) => {
        return await models.Item.update(
          { orderAmount: orderAmount },
          { where: { id: id }, returning: true }
        ).then(res => {
          let item = res[1][0].dataValues
          pubsub.publish(EVENTS.ITEM.CHANGED, {
            itemChanged: { item }
          })
          return item
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
    itemChanged: {
      subscribe: () => pubsub.asyncIterator(EVENTS.ITEM.CHANGED)
    }
  }
}
