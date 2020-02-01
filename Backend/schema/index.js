const { gql } = require('apollo-server-express')
import userSchema from './user'
import itemSchema from './item'
import orderSchema from './order'
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`
export default [linkSchema, userSchema, itemSchema, orderSchema]
