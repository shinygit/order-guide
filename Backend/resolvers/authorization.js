import { ForbiddenError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')

export const isItemOwner = async (parent, { id }, { models, me }) => {
  const item = await models.Item.findByPk(id, { raw: true })

  if (item.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner')
  }
  return skip
}

export const isOrderOwner = async (parent, { id }, { models, me }) => {
  const order = await models.Order.findByPk(id, { raw: true })

  if (order.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner')
  }
  return skip
}
