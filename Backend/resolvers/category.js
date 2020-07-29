import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticatedAsOwner } from './authorization'

export default {
  CategoryCreateResults: {
    __resolveType(parent, context, info) {
      if (parent.error) {
        return 'CategoryError'
      }

      if (parent.id) {
        return 'Category'
      }

      return null
    },
  },
  CategoryDeleteResults: {
    __resolveType(parent, context, info) {
      if (parent.error) {
        return 'CategoryError'
      }

      if (parent.id) {
        return 'Category'
      }

      return null
    },
  },
  Query: {
    categories: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, args, { me, models }) => {
        return await models.Category.findAll({
          where: {
            userId: me.id,
          },
        })
      }
    ),
    category: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { id }, { me, models }) => {
        return await models.Category.findOne({
          where: {
            id: id,
            userId: me.id,
          },
        })
      }
    ),
  },

  Mutation: {
    createCategory: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { input }, { me, models }) => {
        if (input.categoryName.trim() === '') {
          return {
            error: 'A category must have a name!',
          }
        }
        const exists = await models.Category.findOne({
          where: {
            categoryName: input.categoryName,
            userId: me.id,
          },
        })
        if (exists) {
          return {
            error: 'Category already exists!',
          }
        }

        const newCategory = await models.Category.create({
          userId: me.id,
          ...input,
        })
        return newCategory.dataValues
      }
    ),
    deleteCategory: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { id }, { me, models }) => {
        const latestOrder = await models.Order.findOne({
          where: {
            userId: me.id,
          },
          order: [['orderDate', 'DESC']],
        })
        const hasItems = await models.Item.findOne({
          where: {
            categoryId: id,
            orderId: latestOrder.id,
          },
        })
        if (hasItems)
          return {
            error: 'The most current order is using this category.',
          }
        const category = await models.Category.findOne({
          where: {
            id: id,
            userId: me.id,
          },
        })
        if (!category)
          return {
            error: 'This category does not exist.',
          }
        if (category) category.destroy()
        return category.dataValues
      }
    ),
    updateCategory: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { id, input }, { me, models }) => {
        const category = await models.Category.findOne({
          where: {
            id: id,
            userId: me.id,
          },
        })
        if (!category)
          return { __typename: 'CategoryError', error: 'No category match!' }
        if (!input.categoryName)
          return {
            __typename: 'CategoryError',
            error: 'A category must have a name!',
          }
        await category.update({
          categoryName: input.categoryName,
        })
        return { __typename: 'Category', ...category.dataValues }
      }
    ),
  },
}
