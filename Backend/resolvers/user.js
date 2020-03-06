import jwt from 'jsonwebtoken'
import { createUserStarterOrderAndItems } from '../user/utils/createNewUserItems'
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
    }
  },
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll()
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id)
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null
      }
      return await models.User.findByPk(me.id)
    }
  },

  Mutation: {
    signUp: async (parent, { email, password }, { models, secret }) => {
      const user = await models.User.create({
        email,
        password
      })
      await createUserStarterOrderAndItems(user, models)
      return { token: createToken(user, secret, '365d') }
    },

    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login)

      if (!user) {
        return { emailError: 'Invalid Email' }
      }
      const isValid = await user.validatePassword(password)

      if (!isValid) {
        return { passwordError: 'Incorrect password.' }
      }
      return { token: createToken(user, secret, '365d') }
    }
  }

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
