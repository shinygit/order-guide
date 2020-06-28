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

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https')
      return res.redirect('https://' + req.headers.host + req.url)
    else return next()
  } else return next()
})

const getMe = async (req) => {
  const token = req.headers['x-token']
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError('Your session expired.  Sign in again.')
    }
  }
}
const loader = {
  suppliers: new DataLoader(async (ids) => {
    const rows = await models.Supplier.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: ids,
        },
      },
      raw: true,
    })

    const lookUp = rows.reduce((acc, row) => {
      acc[row.id] = row
      return acc
    }, {})

    return ids.map((id) => lookUp[id] || null)
  }),
  locations: new DataLoader(async (ids) => {
    const rows = await models.Location.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: ids,
        },
      },
      raw: true,
    })
    const lookUp = rows.reduce((acc, row) => {
      acc[row.id] = row
      return acc
    }, {})
    return ids.map((id) => lookUp[id] || null)
  }),
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
        loader,
      }
    }
  },
})

server.applyMiddleware({ app, path: '/graphql' })
app.use(express.static(path.join(__dirname, '../Frontend', 'build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend', 'build', 'index.html'))
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const isTest = !!process.env.TEST
sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createUsersWithTestOrders()
  }
  httpServer.listen({ port: process.env.PORT || 3001 }, () => {
    console.log('Apollo Server on http://localhost:3001/graphql')
  })
})
