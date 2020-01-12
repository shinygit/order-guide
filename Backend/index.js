require('dotenv/config')
const cors = require('cors')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const typeDefs = require('./graphql/schema.js')
const resolvers = require('./graphql/resolvers.js')

const app = express()
app.use(cors())

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen(3001, () => console.log(`Server running on port 3001`))
