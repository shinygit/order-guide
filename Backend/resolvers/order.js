import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isOrderOwner } from './authorization'

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
