const uuid = require('uuid')
import Sequelize from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import {
  isAuthenticated,
  isItemOwner,
  isItemReceiver,
  isAuthenticatedAsOwner,
} from './authorization'
import { sendNotification } from './../apis/email/sendNotification'

import pubsub, { EVENTS } from '../subscription'

export default {
  Query: {
    items: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, args, { me, models }) => {
        return await models.Item.findAll({
          where: {
            userId: me.id,
          },
        })
      }
    ),
    item: combineResolvers(
      isAuthenticatedAsOwner,
      isItemOwner,
      async (parent, { id }, { models }) => {
        return await models.Item.findByPk(id)
      }
    ),
  },
  Mutation: {
    createItem: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { input }, { me, models }) => {
        if (input.supplier) {
          let supplier = await models.Supplier.findOne({
            where: {
              supplierName: { [Sequelize.Op.iLike]: input.supplier },
              userId: me.id,
            },
          })
          if (!supplier) {
            supplier = await models.Supplier.create({
              supplierName: input.supplier,
              userId: me.id,
            })
          }
          input.supplier = supplier.id
        }
        if (input.location) {
          let location = await models.Location.findOne({
            where: {
              locationName: { [Sequelize.Op.iLike]: input.location },
              userId: me.id,
            },
          })
          if (!location) {
            location = await models.Location.create({
              locationName: input.location,
              userId: me.id,
            })
          }
          input.location = location.id
        }
        const order = await models.Order.findAll({
          limit: 1,
          order: [['orderDate', 'desc']],
          where: {
            userId: me.id,
          },
          raw: true,
        })
        const item = await models.Item.create({
          itemName: input.itemName,
          buildTo: input.buildTo,
          locationId: input.location,
          supplierId: input.supplier || null,
          orderId: order[0].id,
          unitPriceInPennies: 0,
          isMarketPrice: false,
          productNumber: '',
          unitSize: '',
          itemNote: '',
          specialNote: '',
          receivingNote: '',
          flaggedByReceiver: null,
          receiverNote: null,
        })
        return item
      }
    ),
    deleteItem: combineResolvers(
      isAuthenticatedAsOwner,
      isItemOwner,
      async (parent, { id }, { models }) => {
        return await models.Item.destroy({ where: { id } })
      }
    ),
    updateItem: combineResolvers(
      isAuthenticatedAsOwner,
      isItemOwner,
      async (parent, { id, input }, { me, models }) => {
        const item = await models.Item.findOne({
          where: { id: id },
        })
        if (input.supplier) {
          let supplier = await models.Supplier.findOne({
            where: {
              supplierName: { [Sequelize.Op.iLike]: input.supplier },
              userId: me.id,
            },
          })
          if (supplier) {
            if (supplier.SupplierName != input.supplier) {
              await supplier.update({
                supplierName: input.supplier,
              })
            }
          }
          if (!supplier) {
            supplier = await models.Supplier.create({
              supplierName: input.supplier,
              userId: me.id,
            })
          }
          input.supplier = supplier.id
        }
        if (input.location) {
          let location = await models.Location.findOne({
            where: {
              locationName: { [Sequelize.Op.iLike]: input.location },
              userId: me.id,
            },
          })
          if (location) {
            if (location.LocationName != input.location) {
              await location.update({
                locationName: input.location,
              })
            }
          }
          if (!location) {
            location = await models.Location.create({
              locationName: input.location,
              userId: me.id,
            })
          }
          input.location = location.id
        }
        if (input.category) {
          let category = await models.Category.findOne({
            where: {
              categoryName: input.category,
              userId: me.id,
            },
          })
          if (category) {
            input.category = category.id
          }
          if (!category) {
            input.category = null
          }
        }

        await item.update({
          itemName: input.itemName,
          buildTo: input.buildTo,
          supplierId: input.supplier,
          locationId: input.location,
          unitPriceInPennies: input.unitPriceInPennies,
          isMarketPrice: input.isMarketPrice,
          productNumber: input.productNumber,
          quantityOnHand: input.quantityOnHand,
          quantityReceived: input.quantityReceived,
          unitSize: input.unitSize,
          itemNote: input.itemNote,
          specialNote: input.specialNote,
          receivingNote: input.receivingNote || null,
          flaggedByReceiver: input.flaggedByReceiver,
          receiverNote: input.receiverNote,
        })
        return item
      }
    ),
    updateItemReceiveAmount: combineResolvers(
      isItemReceiver,
      async (parent, { id, quantityReceived }, { me, models }) => {
        const receivedItem = await models.Item.update(
          { quantityReceived: quantityReceived },
          { where: { id: id }, returning: true, plain: true }
        )
        return receivedItem[1].dataValues
      }
    ),
    toggleFlaggedByReceiver: combineResolvers(
      isItemReceiver,
      async (
        parent,
        { id, flaggedByReceiver, receiverNote },
        { me, models }
      ) => {
        const receivedItem = await models.Item.findByPk(id, {
          nest: true,
          include: [
            { model: models.Order, attributes: ['id'] },
            { model: models.Supplier, attributes: ['id'] },
          ],
        })
        const isSubmitted = await models.Supplier_Order.findOne({
          where: {
            supplierId: receivedItem.supplier.id,
            orderId: receivedItem.order.id,
          },
        })
        receivedItem.flaggedByReceiver = flaggedByReceiver
        receivedItem.receiverNote = receiverNote
        receivedItem.save()
        if (isSubmitted.wasOrderReceived) {
          const message = `${receivedItem.itemName} flagged after submit by ${
            me.receiverName || 'you'
          }.\n ${receiverNote}`
          sendNotification(message, me)
        }
        return receivedItem
      }
    ),
    updateItemOrderAmount: combineResolvers(
      isAuthenticatedAsOwner,
      isItemOwner,
      async (parent, { id, orderAmount }, { models }) => {
        return await models.Item.update(
          { orderAmount: orderAmount },
          { where: { id: id }, returning: true }
        ).then((res) => {
          let item = res[1][0].dataValues
          pubsub.publish(EVENTS.ITEM.CHANGED, {
            itemChanged: { item },
          })
          return item
        })
      }
    ),
  },
  Item: {
    userId: async (item, args, { loaders }) => {
      return await loaders.user.load(item.userId)
    },
    supplier: async (item, args, { loader }) => {
      if (!item.supplierId) return ''
      return (await loader.suppliers.load(item.supplierId)).supplierName
    },
    location: async (item, args, { loader }) => {
      if (!item.locationId) return ''
      return (await loader.locations.load(item.locationId)).locationName
    },
    category: async (item, args, { loader }) => {
      if (!item.categoryId) return ''
      return (await loader.categories.load(item.categoryId)).categoryName
    },
    previousOrders: async (item, { count = 2 }, { models }) => {
      if (item.previousOrders) return item.previousOrders
      const previous = await models.Item.findAll({
        attributes: ['id', 'orderAmount'],
        where: {
          itemId: item.itemId,
        },
        include: [
          {
            attributes: [],
            model: models.Order,
          },
        ],
        order: [[models.Order, 'orderDate', 'desc']],
        limit: count + 1,
        raw: true,
      })
      const index = previous.findIndex((x) => x.id === item.id)
      const sliced = previous.slice(index + 1, index + count + 1)
      const array = sliced.map((a) => a.orderAmount)
      return array
    },
    lastOrderedDate: async (item, args, { models, me }) => {
      const test = await models.sequelize.query(
        'select "orderDate" from items join orders on "orderId" = orders.id where "orderId" IN (select id from orders where "userId"=? order by "orderDate" desc offset 1) and "orderAmount" > 0 and "itemId"=?  order by "orderDate" desc limit 1',
        {
          replacements: [me.id, item.itemId],
          raw: true,
          type: models.sequelize.QueryTypes.SELECT,
        }
      )
      return test[0]?.orderDate
    },
    // We try to pull small amounts of data first to make the average more time relative.
    averageWeeklyUse: async (item, args, { models, me }) => {
      const fourWeekAverage = await models.sequelize.query(
        'select AVG("orderAmount") as "averageWeeklyUse" from (select "orderAmount" from items join orders on "orderId"=orders.id where "userId" = ? and "itemId" = ? order by "orderDate" desc offset 1 limit 4) t',
        {
          replacements: [me.id, item.itemId],
          raw: true,
          type: models.sequelize.QueryTypes.SELECT,
        }
      )
      if (fourWeekAverage[0]?.averageWeeklyUse > 0.25)
        return fourWeekAverage[0]?.averageWeeklyUse

      const eightWeekAverage = await models.sequelize.query(
        'select AVG("orderAmount") as "averageWeeklyUse" from (select "orderAmount" from items join orders on "orderId"=orders.id where "userId" = ? and "itemId" = ? order by "orderDate" desc offset 1 limit 8) t',
        {
          replacements: [me.id, item.itemId],
          raw: true,
          type: models.sequelize.QueryTypes.SELECT,
        }
      )
      if (eightWeekAverage[0]?.averageWeeklyUse > 0.125)
        return eightWeekAverage[0]?.averageWeeklyUse

      const sixteenWeekAverage = await models.sequelize.query(
        'select AVG("orderAmount") as "averageWeeklyUse" from (select "orderAmount" from items join orders on "orderId"=orders.id where "userId" = ? and "itemId" = ? order by "orderDate" desc offset 1 limit 16) t',
        {
          replacements: [me.id, item.itemId],
          raw: true,
          type: models.sequelize.QueryTypes.SELECT,
        }
      )
      if (sixteenWeekAverage[0]?.averageWeeklyUse > 0.0625)
        return sixteenWeekAverage[0]?.averageWeeklyUse

      const thirtyTwoWeekAverage = await models.sequelize.query(
        'select AVG("orderAmount") as "averageWeeklyUse" from (select "orderAmount" from items join orders on "orderId"=orders.id where "userId" = ? and "itemId" = ? order by "orderDate" desc offset 1 limit 32) t',
        {
          replacements: [me.id, item.itemId],
          raw: true,
          type: models.sequelize.QueryTypes.SELECT,
        }
      )
      if (thirtyTwoWeekAverage[0]?.averageWeeklyUse > 0)
        return thirtyTwoWeekAverage[0]?.averageWeeklyUse
      return 0
    },
  },
  Subscription: {
    itemChanged: {
      subscribe: () => pubsub.asyncIterator(EVENTS.ITEM.CHANGED),
    },
  },
}
