import { gql } from 'apollo-server-express'
export default gql`
  extend type Query {
    orders(orderDepth: Int!): [Order!]
    supplierOrder(supplierId: ID!, orderId: ID!): SupplierOrder!
    suppliersOrdered(orderId: Int!): [SupplierOrder]!
  }
  extend type Mutation {
    createNewOrder(orderDate: String!): Boolean!
    deleteOrder(orderDate: String!): Boolean!
    toggleOrderLock(orderDate: String!): Order!
    toggleOrderPlacedWithSupplierId(
      supplierId: ID!
      orderId: ID!
    ): SupplierOrder!
  }
  type Order {
    id: ID!
    orderDate: String!
    isLocked: Boolean!
    items: [Item!]
    userId: User!
  }
  type SupplierOrder {
    wasOrderPlaced: Boolean!
    orderId: Int!
    supplierId: Int!
  }
`
