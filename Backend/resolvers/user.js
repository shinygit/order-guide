import jwt from 'jsonwebtoken'
import { createUserStarterOrderAndItems } from '../user/utils/createNewUserItems'
import { log } from './../graphQLMiddleware/log'
import { rateLimit, clearRateLimit } from './../graphQLMiddleware/rate-limit'
import { combineResolvers } from 'graphql-resolvers'

const createToken = async (user, secret, expiresIn) => {
  const { id, email } = user
  return await jwt.sign({ id, email }, secret, { expiresIn })
}

export default {
  LoginResults: {
    __resolveType(parent, context, info) {
      if (parent.emailError || parent.passwordError) {
        return 'LoginError'
      }

      if (parent.token) {
        return 'Token'
      }

      return null
    },
  },
  RegisterResults: {
    __resolveType(parent, context, info) {
      if (parent.emailError || parent.passwordError) {
        return 'RegisterErrors'
      }

      if (parent.email) {
        return 'User'
      }

      return null
    },
  },
  Me: {
    __resolveType(parent, context, info) {
      /*       if (parent.type === 'OWNER') {
        return 'User'
      } */
      if (parent.receivesForUser) {
        return 'Receiver'
      }
      return 'User'
    },
  },
  Query: {
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null
      }
      if (me.receivesForUser) {
        return await models.Receiver.findByPk(me.id)
      }
      return await models.User.findByPk(me.id)
    },
  },

  Mutation: {
    signUp: async (parent, { email, password }, { models, secret }) => {
      if (password.length < 8)
        return {
          __typename: 'RegisterErrors',
          passwordError: 'Password must be at least 8 characters long',
        }
      email = email.toLowerCase().trim()
      const userExists = await models.User.findOne({
        where: { email: email },
      })
      if (userExists)
        return {
          __typename: 'RegisterErrors',
          emailError: 'An account with that email already exists.',
        }
      const user = await models.User.create({
        email,
        password,
      }).catch((e) => console.log(e))
      if (!user)
        return {
          __typename: 'RegisterErrors',
          emailError: 'There was a problem with your email.',
        }
      if (user) await createUserStarterOrderAndItems(user, models)
      return { email: user.dataValues.email }
    },

    signIn: combineResolvers(
      rateLimit(),
      log,
      async (parent, { login, password }, { models, secret, req }, info) => {
        const user = await models.User.findByLogin(login.trim())

        if (!user) {
          return { emailError: 'Invalid Email' }
        }
        const isValid = await user.validatePassword(password)

        if (!isValid) {
          return { passwordError: 'Incorrect password.' }
        }
        // clearRateLimit(req, info)
        return { token: createToken(user, secret, '365d') }
      }
    ),
  },

  /*   User: {
    items: async (user, args, { loaders }) => {
       return await models.Item.findAll({
        where: {
          userId: user.id
        }
      }) 
      return await loaders.item.load(user.id)
    }
  } */
}
