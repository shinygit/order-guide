import { combineResolvers } from 'graphql-resolvers'
import {
  isAuthenticated,
  isOrderOwner,
  isOrderSupplierOwner,
  isAuthenticatedAsReceiver,
  isAuthenticatedAsOwner,
} from './authorization'
import { UserInputError } from 'apollo-server-express'
import { sendNotification } from '../apis/email/sendNotification'
const Op = require('sequelize').Op

export default {
  Query: {
    orders: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { offset = 0, orderDepth = 1 }, { me, models }) => {
        return await models.Order.findAll({
          offset: offset,
          limit: orderDepth,
          order: [['orderDate', 'desc']],
          where: {
            userId: me.id,
          },
        })
      }
    ),
    orderForReceiving: combineResolvers(
      isAuthenticatedAsReceiver,
      async (parent, args, { me, models }) => {
        const latest = await models.Order.findOne({
          order: [['orderDate', 'desc']],
          where: {
            userId: me.receivesForUser || me.id,
          },
        })
        return latest
      }
    ),
    supplierOrder: combineResolvers(
      isOrderSupplierOwner,
      async (parent, { supplierId, orderId }, { me, models }) => {
        const isOrderPlaced = await models.Supplier_Order.findOrCreate({
          where: { supplierId: supplierId, orderId: orderId },
        })
        return isOrderPlaced[0].dataValues
      }
    ),
    supplierOrders: combineResolvers(
      isAuthenticatedAsReceiver,
      async (parent, { orderId }, { me, models }) => {
        const order = await models.Order.findOne({
          where: { id: orderId, userId: me.receivesForUser || me.id },
        })
        const orderSuppliersReceived = await models.Supplier_Order.findAll({
          where: { orderId: order.dataValues.id },
        })
        return orderSuppliersReceived
      }
    ),
  },
  Mutation: {
    toggleOrderPlacedWithSupplierId: combineResolvers(
      isAuthenticatedAsOwner,
      isOrderSupplierOwner,
      async (parent, { supplierId, orderId }, { me, models }) => {
        const isOrderPlaced = await models.Supplier_Order.findOne({
          where: { supplierId: supplierId, orderId: orderId },
        })
        if (isOrderPlaced) {
          isOrderPlaced.wasOrderPlaced = !isOrderPlaced.wasOrderPlaced
          isOrderPlaced.save()
          return isOrderPlaced.dataValues
        }
      }
    ),
    toggleOrderReceivedWithSupplierId: combineResolvers(
      isOrderSupplierOwner,
      async (
        parent,
        { supplierId, orderId, additionalNotes },
        { me, models }
      ) => {
        const supplier = await models.Supplier.findOne({
          where: { id: supplierId },
        })
        const flaggedItems = await models.Item.findAll({
          where: {
            orderId: orderId,
            supplierId: supplierId,
            flaggedByReceiver: { [Op.ne]: null },
          },
        })
        await models.Supplier_Order.update(
          {
            additionalNotes: additionalNotes,
          },
          { where: { supplierId: supplierId, orderId: orderId } }
        )
        const isOrderPlaced = await models.Supplier_Order.findOne({
          where: {
            supplierId: supplierId,
            orderId: orderId,
            wasOrderPlaced: true,
          },
        })

        if (isOrderPlaced) {
          let notificationSendingError
          isOrderPlaced.wasOrderReceived = !isOrderPlaced.wasOrderReceived
          isOrderPlaced.save()
          if (flaggedItems.length > 0 || isOrderPlaced.additionalNotes) {
            const firstLine = `${me.receiverName || 'You'} flagged ${
              flaggedItems.length
            } item${
              flaggedItems.length > 1 || flaggedItems.length === 0 ? 's' : ''
            } on a delivery from ${supplier.supplierName}!`

            const itemsForMessage = flaggedItems.map(
              (item) => `\n${item.itemName}: ${item.receiverNote}`
            )

            const additional =
              additionalNotes && `\nAdditional Notes: ${additionalNotes}`

            const message = [
              firstLine,
              itemsForMessage.join(''),
              additional,
            ].join('')

            try {
              await sendNotification(message, me)
            } catch (error) {
              if (error) notificationSendingError = true
            }
          }
          return {
            ...isOrderPlaced.dataValues,
            notificationSendingError: notificationSendingError,
            __typename: 'SupplierOrder',
          }
        } else {
          return {
            __typename: 'SupplierOrderError',
            error: 'Order has not been placed yet.',
          }
        }
      }
    ),
    toggleOrderLock: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { orderDate }, { me, models }) => {
        const currentOrder = await models.Order.findOne({
          where: { orderDate: orderDate, userId: me.id },
        })
        currentOrder.isLocked = !currentOrder.isLocked
        await currentOrder.save()
        return currentOrder
      }
    ),

    deleteOrder: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { orderDate }, { me, models }) => {
        let safeToDelete = false
        const currentOrder = await models.Order.findAll({
          order: [['orderDate', 'desc']],
          limit: 2,
          where: { userId: me.id },
          raw: true,
        })
        const hasItems = await models.Item.findAll({
          where: { orderId: currentOrder[0].id },
          raw: true,
        })
        if (currentOrder.length > 1) safeToDelete = true
        if (hasItems.length === 0) safeToDelete = true
        if (!safeToDelete)
          throw new UserInputError('Last order still has items.')
        if (hasItems.some((item) => item.orderAmount > 0))
          throw new UserInputError('All items must be 0 or unchecked.')
        const count = await models.Order.destroy({
          where: { orderDate: orderDate, userId: me.id },
        }).error((x) => {
          console.log(x)
          return false
        })
        const remainingOrders = await models.Order.findAll({
          order: [['orderDate', 'desc']],
          limit: 2,
          where: { userId: me.id },
          raw: true,
        })
        if (remainingOrders.length === 0) {
          const newOrder = await models.Order.create({
            orderDate: new Date('0001-01-02'),
            userId: me.id,
          })
        }
        return !!count
      }
    ),
    createNewOrder: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { orderDate }, { me, models }) => {
        let theyDeletedAllTheOrders = false
        const exists = await models.Order.findOne({
          where: { orderDate: orderDate, userId: me.id },
          raw: true,
        })
        if (exists) throw new UserInputError('Order date already exists.')
        const currentOrder = await models.Order.findAll({
          order: [['orderDate', 'desc']],
          limit: 1,
          where: { userId: me.id },
          raw: true,
        })

        if (!currentOrder[0]) {
          theyDeletedAllTheOrders = true
          const newOrder = await models.Order.create({
            orderDate: orderDate,
            userId: me.id,
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
          userId: me.id,
        })
        const items = await models.Item.findAll({
          where: { orderId: currentOrder[0].id },
          raw: true,
        })
        const setSupplierIfMarketPrice = async (item) => {
          if (item.isMarketPrice === false) {
            return item.supplierId
          }
          if (item.isMarketPrice === true) {
            let marketPriceId = await models.Supplier.findOne({
              where: { userId: me.id, supplierName: 'Market Price' },
            })
            if (!marketPriceId) {
              const mp = await models.Supplier.create({
                supplierName: 'Market Price',
                userId: me.id,
              })
              marketPriceId = mp.dataValues
            }
            return marketPriceId.id
          }
        }
        const newOrderItems = Promise.all(
          items.map(async (item) => {
            delete item.id
            return {
              ...item,
              orderAmount: null,
              flaggedByReceiver: null,
              quantityReceived: null,
              supplierId: await setSupplierIfMarketPrice(item),
              orderId: newOrder.id,
            }
          })
        )
        models.Item.bulkCreate(await newOrderItems)
        return true
      }
    ),
  },

  Order: {
    userId: async (order, args, { models }) => {
      return await models.User.findById(order.userId)
    },
    items: async (order, args, { models }) => {
      return await models.Item.findAll({
        where: {
          orderId: order.id,
        },
      })
    },
  },
}
