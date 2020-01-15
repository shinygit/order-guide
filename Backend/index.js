const cors = require('cors')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')

import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'

const app = express()
app.use(cors())

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    me: await models.User.findByLogin('rwieruch')
  })
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
