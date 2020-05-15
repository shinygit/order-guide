import { gql } from 'apollo-server-express'
export default gql`
  extend type Query {
    orders(orderDepth: Int!): [Order!]
    isOrderPlacedWithSupplierId(supplierId: ID!, orderId: ID!): Boolean!
  }
  extend type Mutation {
    createNewOrder(orderDate: String!): Boolean!
    deleteOrder(orderDate: String!): Boolean!
    toggleOrderLock(orderDate: String!): Order!
    toggleOrderPlacedWithSupplierId(supplierId: ID!, orderId: ID!): Boolean!
  }
  type Order {
    id: ID!
    orderDate: String!
    isLocked: Boolean!
    items: [Item!]
    userId: User!
  }
`
