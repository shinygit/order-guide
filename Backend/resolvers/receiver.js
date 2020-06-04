import jwt from 'jsonwebtoken'
import { combineResolvers } from 'graphql-resolvers'
import {
  isAuthenticated,
  isOrderOwner,
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
            __typename: 'RegisterErrors',
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
