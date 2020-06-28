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
          receivingNote: input.receivingNote,
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
      /*       if (item.supplier) return item.supplier
      let supplier = await models.Supplier.findByPk(item.supplierId)
      if (supplier) return supplier.supplierName
      if (!supplier) return '' */
    },
    location: async (item, args, { loader }) => {
      if (!item.locationId) return ''
      return (await loader.locations.load(item.locationId)).locationName
      /*       if (item.location) return item.location
      let location = await models.Location.findByPk(item.locationId)
      return location.locationName */
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
      while (array.length < count) {
        array.push(0)
      }
      return array
    },
  },
  Subscription: {
    itemChanged: {
      subscribe: () => pubsub.asyncIterator(EVENTS.ITEM.CHANGED),
    },
  },
}
