import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isOrderOwner } from './authorization'
import { UserInputError } from 'apollo-server-express'

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
        let safeToDelete = false
        const currentOrder = await models.Order.findAll({
          order: [['orderDate', 'desc']],
          limit: 2,
          where: { userId: me.id },
          raw: true
        })
        const hasItems = await models.Item.findAll({
          where: { orderId: currentOrder[0].id },
          raw: true
        })
        if (currentOrder.length > 1) safeToDelete = true
        if (hasItems.length === 0) safeToDelete = true
        if (!safeToDelete)
          throw new UserInputError('Last order still has items.')
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
        let theyDeletedAllTheOrders = false
        const exists = await models.Order.findOne({
          where: { orderDate: orderDate, userId: me.id },
          raw: true
        })
        if (exists) throw new UserInputError('Order date already exists.')
        const currentOrder = await models.Order.findAll({
          order: [['orderDate', 'desc']],
          limit: 1,
          where: { userId: me.id },
          raw: true
        })

        if (!currentOrder[0]) {
          theyDeletedAllTheOrders = true
          const newOrder = await models.Order.create({
            orderDate: orderDate,
            userId: me.id
          })
        }
        if (theyDeletedAllTheOrders) return true
        if (currentOrder[0].orderDate > orderDate) {
          throw new UserInputError(
            'New order date must be more recent than the last order.'
          )
        }
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
            specialNote: null,
            orderId: newOrder.id
          }
        })
        models.Item.bulkCreate(newOrderItems)
        return true
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
