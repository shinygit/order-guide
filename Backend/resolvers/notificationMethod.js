import { combineResolvers } from 'graphql-resolvers'
const { Op } = require('sequelize')
import {
  isAuthenticated,
  isItemOwner,
  isItemReceiver,
  isAuthenticatedAsOwner,
} from './authorization'
import { sendConfirmationCodeEmail } from '../apis/email/sendConfirmationCodeEmail'

export default {
  NotificationMethodResult: {
    __resolveType(parent, context, info) {
      if (parent.error) {
        return 'NotificationMethodError'
      } else {
        return 'NotificationMethod'
      }
    },
  },
  Query: {
    notificationMethods: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, args, { models, me }) => {
        return await models.NotificationMethod.findAll({
          where: { userId: me.id, deleted: false },
        })
      }
    ),
  },

  Mutation: {
    addNotificationMethod: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { email, phoneNumber }, { models, me }) => {
        const emailOrPhoneNumber = {}
        emailOrPhoneNumber.userId = me.id
        if (email) emailOrPhoneNumber.email = email
        if (phoneNumber) emailOrPhoneNumber.phoneNumber = phoneNumber

        if (email) {
          const emailExists = await models.NotificationMethod.findOne({
            where: {
              userId: me.id,
              email: email,
              deleted: false,
            },
          })
          if (emailExists) {
            return { error: 'This notification method has already been added.' }
          }
        }
        if (phoneNumber) {
          const phoneNumberExists = await models.NotificationMethod.findOne({
            where: {
              userId: me.id,
              phoneNumber: phoneNumber,
              deleted: false,
            },
          })
          if (phoneNumberExists) {
            return { error: 'This notification method has already been added.' }
          }
        }

        const previouslyDeleted = await models.NotificationMethod.findOne({
          where: emailOrPhoneNumber,
        })

        if (previouslyDeleted?.confirmationSentAttempts > 5) {
          return {
            error:
              'Maximum amount of attempts reached.  Contact support to resolve.',
          }
        }
        if (previouslyDeleted) {
          previouslyDeleted.deleted = false
          previouslyDeleted.confirmed = false
          previouslyDeleted.confirmationCode = Math.floor(
            10000 + Math.random() * 90000
          )
          previouslyDeleted.confirmationSentAttempts =
            previouslyDeleted.confirmationSentAttempts + 1
          if (previouslyDeleted.email) {
            try {
              await sendConfirmationCodeEmail(
                previouslyDeleted.email,
                previouslyDeleted.confirmationCode
              )
            } catch {
              return { error: 'Something went wrong.' }
            }
          }
          return previouslyDeleted.save()
        }

        if (email !== undefined && phoneNumber !== undefined) {
          return {
            error: 'You can only add one notification method at a time.',
          }
        }
        const method = await models.NotificationMethod.create({
          email,
          phoneNumber,
          confirmationCode: Math.floor(10000 + Math.random() * 90000),
          userId: me.id,
        })
        if (method.email) {
          try {
            await sendConfirmationCodeEmail(email, method.confirmationCode)
          } catch {
            return { error: 'Something went wrong.' }
          }
        }

        return {
          id: method.dataValues.id,
          email: method.dataValues.email,
          phoneNumber: method.dataValues.phoneNumber,
          confirmed: method.dataValues.confirmed,
        }
      }
    ),
    confirmNotificationMethod: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { id, confirmationCode }, { models, me }) => {
        const method = await models.NotificationMethod.findOne({
          where: {
            id: id,
            userId: me.id,
          },
        }).catch((e) => console.log(e))
        if (method.confirmationAttempts > 5)
          return {
            error:
              'Maximum amount of attempts reached.  Contact support to resolve.',
          }
        await method.increment('confirmationAttempts')

        if (method.confirmationCode != confirmationCode) {
          return {
            error: 'Sorry that appears to be incorrect. Please try again.',
          }
        }
        if (method.confirmationCode == confirmationCode) {
          method.confirmationCode = null
          method.confirmed = true
          method.confirmationSentAttempts = 0
          method.confirmationAttempts = 0
        }
        await method.save()
        return {
          id: method.id,
          email: method.email,
          phoneNumber: method.phoneNumber,
          confirmed: method.confirmed,
        }
      }
    ),
    deleteNotificationMethod: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, { id }, { models, me }) => {
        const deleted = await models.NotificationMethod.update(
          {
            deleted: true,
          },
          { where: { id: id, userId: me.id } }
        )
        if (deleted) return true
      }
    ),
  },
}
