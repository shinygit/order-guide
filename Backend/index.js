const cors = require('cors')
const express = require('express')
const http = require('http')
const path = require('path')
const jwt = require('jsonwebtoken')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const Sequelize = require('sequelize')
import DataLoader from 'dataloader'

import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'
import item from './schema/item'
import createUsersWithTestOrders from './tests/createUsersWithTestOrders'
require('dotenv').config()

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
          user: new DataLoader(keys => batchUsers(keys, models)),
          item: new DataLoader(keys => batchItems(keys, models))
        }
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })
app.use(express.static(path.join(__dirname, '../Frontend', 'build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend', 'build', 'index.html'))
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const isTest = !!process.env.TEST
sequelize.sync({ force: !isTest }).then(async () => {
  if (isTest) {
    createUsersWithTestOrders()
  }
  httpServer.listen({ port: process.env.PORT || 3001 }, () => {
    console.log('Apollo Server on http://localhost:3001/graphql')
  })
})
