import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isOrderOwner } from './authorization'
import { UserInputError } from 'apollo-server-core'

export default {
  Query: {
    orders: combineResolvers(
      isAuthenticated,
      async (parent, { offset = 0, orderDepth = 1 }, { me, models }) => {
        return await models.Order.findAll({
          offset: offset,
          limit: orderDepth,
          order: [['orderDate', 'desc']],
          where: {
            userId: me.id
          }
        })
      }
    )
  },
  Mutation: {
    deleteOrder: combineResolvers(
      isAuthenticated,
      async (parent, { orderDate }, { me, models }) => {
        orderDate = new Date(orderDate)
        const count = await models.Order.destroy({
          where: { orderDate: orderDate, userId: me.id }
        }).error(x => {
          console.log(x)
          return false
        })
        return !!count
      }
    ),
    createNewOrder: combineResolvers(
      isAuthenticated,
      async (parent, { orderDate }, { me, models }) => {
        const exists = await models.Order.findOne({
          where: { orderDate: orderDate, userId: me.id }
        })
        if (exists) throw new UserInputError('Order date already exists.')
        const currentOrder = await models.Order.findAll({
          order: [['orderDate', 'desc']],
          limit: 1,
          where: { userId: me.id },
          raw: true
        })
        const newOrder = await models.Order.create({
          orderDate: orderDate,
          userId: me.id
        })
        const items = await models.Item.findAll({
          where: { orderId: currentOrder[0].id },
          raw: true
        })
        const newOrderItems = items.map(item => {
          delete item.id
          return {
            ...item,
            orderAmount: null,
            orderId: newOrder.id
          }
        })
        return models.Item.bulkCreate(newOrderItems)
          .then(x => {
            return true
          })
          .error(x => {
            return false
          })
      }
    )
  },

  Order: {
    userId: async (order, args, { models }) => {
      return await models.User.findById(order.userId)
    },
    items: async (order, args, { models }) => {
      return await models.Item.findAll({
        where: {
          orderId: order.id
        }
      })
    }
  }
}
