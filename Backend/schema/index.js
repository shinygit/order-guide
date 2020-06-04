const { gql } = require('apollo-server-express')
import userSchema from './user'
import itemSchema from './item'
import orderSchema from './order'
import supplierSchema from './supplier'
import locationSchema from './location'
import receiverSchema from './receiver'
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
export default [
  linkSchema,
  userSchema,
  itemSchema,
  orderSchema,
  supplierSchema,
  locationSchema,
  receiverSchema,
]
