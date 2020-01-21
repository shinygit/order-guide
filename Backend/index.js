const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')

import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'

const app = express()
app.use(cors())

const getMe = async req => {
  const token = req.headers['x-token']

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError('Your session expired.  Sign in again.')
    }
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req)

    return {
      models,
      me,
      secret: process.env.SECRET
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

const eraseDatabaseOnSync = true
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages()
  }
  app.listen({ port: 3001 }, () => {
    console.log('Apollo Server on http://localhost:3001/graphql')
  })
})

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      items: [
        {
          itemName: 'Published the Road to learn React'
        }
      ]
    },
    {
      include: [models.Item]
    }
  )
  await models.User.create(
    {
      username: 'ddavids',
      email: 'hello@david.com',
      password: 'dddavids',
      items: [
        {
          itemName: 'Happy to release ...'
        },
        {
          itemName: 'Published a complete ...'
        }
      ]
    },
    {
      include: [models.Item]
    }
  )
}
