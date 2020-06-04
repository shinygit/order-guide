import { ForbiddenError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')

export const isAuthenticatedAsReceiver = (parent, args, { me }) =>
  me.email
    ? skip
    : me.receivesForUser
    ? skip
    : new ForbiddenError('Not authenticated as receiver.')

export const isItemOwner = async (parent, { id }, { models, me }) => {
  if (me.receivesForUser) {
    throw new ForbiddenError('Not authenticated as owner')
  }
  const item = await models.Item.findByPk(id, {
    raw: true,
    nest: true,
    include: [{ model: models.Order, attributes: ['userId'] }],
  })
  if (item.order.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner')
  }
  return skip
}

export const isItemReceiver = async (parent, { id }, { models, me }) => {
  const item = await models.Item.findByPk(id, {
    raw: true,
    nest: true,
    include: [{ model: models.Order, attributes: ['userId'] }],
  })
  if (me.email && item.order.userId === me.id) return skip
  if (item.order.userId == me.receivesForUser) return skip
  throw new ForbiddenError('Not authenticated as receiver')
}

export const isOrderOwner = async (parent, { id, orderId }, { models, me }) => {
  if (me.receivesForUser) {
    throw new ForbiddenError('Not authenticated as owner')
  }
  const order = (await models.Order.findByPk(id, { raw: true })) || {}
  const order2 = (await models.Order.findByPk(orderId, { raw: true })) || {}
  if (order.userId !== me.id && order2.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner')
  }
  return skip
}

export const isOrderSupplierOwner = async (
  parent,
  { supplierId, orderId },
  { me, models }
) => {
  if (me.receivesForUser) {
    me.id = receivesForUser
  }
  const [supplier, order] = await Promise.all([
    await models.Supplier.findOne({
      where: {
        id: supplierId,
        userId: me.id,
      },
    }),
    await models.Order.findOne({
      where: {
        id: orderId,
        userId: me.id,
      },
    }),
  ])
  if (!supplier || !order) {
    throw new ForbiddenError('Not authenticated as owner')
  }
  return skip
}
