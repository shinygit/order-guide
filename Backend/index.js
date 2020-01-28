const cors = require('cors')
const express = require('express')
const http = require('http')
const jwt = require('jsonwebtoken')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const Sequelize = require('sequelize')
import DataLoader from 'dataloader'

import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'
import item from './schema/item'

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
const batchUsers = async (keys, models) => {
  const users = await models.User.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: keys
      }
    }
  })
  return keys.map(key => users.find(user => user.id === key))
}
const batchItems = async (keys, models) => {
  const items = await models.Item.findAll({
    where: {
      userId: {
        [Sequelize.Op.in]: keys
      }
    }
  })
  return keys.map(key => items.filter(item => item.userId === key))
}
const userLoader = new DataLoader(keys => batchUsers(keys, models))
const itemLoader = new DataLoader(keys => batchItems(keys, models))

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return { models }
    }
    if (req) {
      const me = await getMe(req)

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: userLoader,
          item: itemLoader
        }
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const isTest = !!process.env.TEST
sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createUsersWithMessages(new Date())
  }
  httpServer.listen({ port: 3001 }, () => {
    console.log('Apollo Server on http://localhost:3001/graphql')
  })
})

const createUsersWithMessages = async date => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      items: [
        {
          itemName: 'Published the Road to learn React',
          orderDate: date.setSeconds(date.getSeconds() + 1),
          location: { locationName: 'floor' }
        }
      ]
    },
    {
      include: [{ model: models.Item, include: [models.Location] }]
    }
  )

  await models.User.create(
    {
      username: 'ddavids',
      email: 'hello@david.com',
      password: '12345678',
      items: [
        {
          itemName: 'Good Book',
          orderDate: '2020-01-20',
          locationId: 1
        },
        {
          itemName: 'Bad Book',
          orderDate: '2020-01-21',
          locationId: 1
        }
      ]
    },
    {
      include: [{ model: models.Item, include: [models.Location] }]
    }
  )
}
