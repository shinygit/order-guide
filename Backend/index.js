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

  if (token != 'undefined') {
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
  const loc1 = await models.Location.create({ locationName: 'floor' })
  const loc2 = await models.Location.create({ locationName: 'not floor' })
  const sup1 = await models.Supplier.create({ supplierName: 'good store' })
  const sup2 = await models.Supplier.create({ supplierName: 'not good store' })
  const user = await models.User.create(
    {
      username: 'ddavids',
      email: 'hello@david.com',
      password: '12345678',
      orders: [
        {
          orderDate: '2020-01-01',
          items: [
            {
              itemName: 'Good Book',
              orderAmount: 2,
              buildTo: 2,
              locationId: 1,
              supplierId: 1,
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90'
            },
            {
              itemName: 'Bad Book',
              orderAmount: 2,
              buildTo: 2,
              locationId: 2,
              supplierId: 2,
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f'
            }
          ]
        },
        {
          orderDate: '2020-01-05',
          items: [
            {
              itemName: 'Good Book',

              buildTo: 5,
              locationId: 1,
              supplierId: 1,
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90'
            },
            {
              itemName: 'Bad Book',
              orderAmount: 3,
              buildTo: 5,
              locationId: 2,
              supplierId: 2,
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f'
            }
          ]
        },
        {
          orderDate: '2020-01-10',
          items: [
            {
              itemName: 'Good Book',
              orderAmount: 4,
              buildTo: 5,
              locationId: 1,
              supplierId: 1,
              itemId: '8b41c801-dce8-4899-b0a2-498ccc25df90'
            },
            {
              itemName: 'Bad Book',
              orderAmount: 4,
              buildTo: 5,
              locationId: 2,
              supplierId: 2,
              itemId: '4018d0fc-a835-4e99-82ad-b088a300375f'
            }
          ]
        }
      ]
    },
    { include: { model: models.Order, include: [{ model: models.Item }] } }
  )
  loc1.setUser(user)
  loc2.setUser(user)
  sup1.setUser(user)
  sup2.setUser(user)
}

/*   {
      include: [
        {
          model: models.Order,
          include: [
            {
              model: models.Item,
              include: [
                { model: models.Location, include: [models.User] },
                { model: models.Supplier, include: [models.User] }
              ]
            }
          ]
        },
        models.Location,
        models.Supplier
      ]
    } */
