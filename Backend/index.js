require('dotenv/config')
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
  context: {
    models,
    me: models.users[1]
  }
})

server.applyMiddleware({ app, path: '/graphql' })
sequelize.sync().then(async () => {
  app.listen({ port: 3001 }, () => console.log(`Server running on port 3001`))
})
