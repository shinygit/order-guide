import jwt from 'jsonwebtoken'
import { combineResolvers } from 'graphql-resolvers'
import {
  isAuthenticated,
  isOrderSupplierOwner,
  isAuthenticatedAsReceiver,
  isAuthenticatedAsOwner,
} from './authorization'

const createToken = async (receiver, secret, expiresIn) => {
  const { id, receiverName, receivesForUser } = receiver
  return await jwt.sign({ id, receiverName, receivesForUser }, secret, {
    expiresIn,
  })
}

export default {
  LoginReceiverResults: {
    __resolveType(parent, context, info) {
      if (parent.loginError || parent.passwordError) {
        return 'LoginReceiverError'
      }

      if (parent.token) {
        return 'Token'
      }

      return null
    },
  },
  CreateReceiverResults: {
    __resolveType(parent, context, info) {
      if (parent.loginError || parent.passwordError) {
        return 'CreateReceiverError'
      }

      if (parent.login) {
        return 'Receiver'
      }

      return null
    },
  },
  UpdateReceiverResults: {
    __resolveType(parent, context, info) {
      if (parent.loginError || parent.passwordError) {
        return 'UpdateReceiverError'
      }

      if (parent.login) {
        return 'Receiver'
      }

      return null
    },
  },
  Query: {
    receivers: combineResolvers(
      isAuthenticatedAsOwner,
      async (parent, args, { me, models }) => {
        return await models.Receiver.findAll({
          where: {
            receivesForUser: me.id,
          },
        })
      }
    ),
  },
  Mutation: {
    createReceiver: combineResolvers(
      isAuthenticatedAsOwner,
      async (
        parent,
        { login, password, receiverName },
        { models, secret, me }
      ) => {
        if (password.length < 8)
          return {
            __typename: 'CreateReceiverError',
            passwordError: 'Password must be at least 8 characters long',
          }
        login = login.toLowerCase().trim()
        const receiverExists = await models.Receiver.findOne({
          where: { login: login },
        })
        if (receiverExists)
          return {
            __typename: 'CreateReceiverError',
            loginError: 'An account with that login already exists.',
          }
        const receiver = await models.Receiver.create({
          login,
          password,
          receiverName,
          receivesForUser: me.id,
        }).catch((e) => console.log(e))
        if (!receiver)
          return {
            __typename: 'CreateReceiverError',
            loginError: 'There was a problem with your login.',
          }
        return receiver
      }
    ),
    updateReceiver: combineResolvers(
      isAuthenticatedAsOwner,
      async (
        parent,
        { id, login, password, receiverName },
        { models, secret, me }
      ) => {
        if (password && password.length < 8)
          return {
            __typename: 'UpdateReceiverErrors',
            passwordError: 'Password must be at least 8 characters long',
          }
        if (login) {
          login = login.toLowerCase().trim()
          const receiverExists = await models.Receiver.findOne({
            where: { login: login },
          })
          if (receiverExists)
            return {
              __typename: 'UpdateReceiverErrors',
              loginError: 'An account with that login already exists.',
            }
        }
        const updatedReceiver = await models.Receiver.update(
          {
            login,
            password,
            receiverName,
          },
          {
            where: { id: id },
            individualHooks: true,
            returning: true,
            raw: true,
          }
        ).catch((e) => console.log(e))
        if (!updatedReceiver)
          return {
            __typename: 'updateReceiverError',
            updateError: 'There was a problem with your update.',
          }
        return updatedReceiver[1][0]
      }
    ),
    loginReceiver: async (parent, { login, password }, { models, secret }) => {
      const receiver = await models.Receiver.findByLogin(login.trim())

      if (!receiver) {
        return { loginError: 'Invalid Login' }
      }
      const isValid = await receiver.validatePassword(password)

      if (!isValid) {
        return { passwordError: 'Incorrect password.' }
      }
      return { token: createToken(receiver, secret, '365d') }
    },
  },
}
