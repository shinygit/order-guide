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
  RegisterResults: {
    __resolveType(parent, context, info) {
      console.log(parent)
      if (parent.emailError || parent.passwordError) {
        return 'RegisterErrors'
      }

      if (parent.email) {
        return 'User'
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
      if (password.length < 8)
        return { passwordError: 'Password must be at least 8 characters long' }
      email = email.toLowerCase().trim()
      const userExists = await models.User.findOne({
        where: { email: email }
      })
      if (userExists)
        return { emailError: 'An account with that email already exists.' }
      const user = await models.User.create({
        email,
        password
      }).catch(e => console.log(e))
      if (!user) return { emailError: 'There was a problem with your email.' }
      if (user) await createUserStarterOrderAndItems(user, models)
      return { email: user.dataValues.email }
    },

    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login.trim())

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
