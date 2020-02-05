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
    updateItemOrderAmount: combineResolvers(
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
    userId: async (item, args, { loaders }) => {
      return await loaders.user.load(item.userId)
    },
    supplier: async (item, args, { models }) => {
      let supplier = await models.Supplier.findByPk(item.supplierId)
      return supplier.supplierName
    },
    location: async (item, args, { models }) => {
      let location = await models.Location.findByPk(item.locationId)
      return location.locationName
    },
    previousOrders: async (item, { count }, { models }) => {
      const previous = await models.Item.findAll({
        attributes: ['id', 'orderAmount'],
        where: {
          itemId: item.itemId
        },
        include: [
          {
            attributes: [],
            model: models.Order
          }
        ],
        order: [[models.Order, 'orderDate', 'desc']],
        raw: true
      })
      const index = previous.findIndex(x => x.id === item.id)
      const sliced = previous.slice(index + 1, index + count + 1)
      const array = sliced.map(a => a.orderAmount)
      while (array.length < count) {
        array.push(0)
      }
      return array
      /*       const lastWeek = previous[index + 1]
      const twoWeeksAgo = previous[index + 2]
      return [
        lastWeek ? lastWeek.orderAmount : 0,
        twoWeeksAgo ? twoWeeksAgo.orderAmount : 0
      ] */
    }
  },
  Subscription: {
    itemChanged: {
      subscribe: () => pubsub.asyncIterator(EVENTS.ITEM.CHANGED)
    }
  }
}
