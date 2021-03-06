import { gql } from 'apollo-server-express'
export default gql`
  union SupplierOrderResults = SupplierOrder | SupplierOrderError

  extend type Query {
    orders(orderDepth: Int!): [Order!]
    supplierOrder(supplierId: ID!, orderId: ID!): SupplierOrder!
    supplierOrders(orderId: ID!): [SupplierOrder]!
    orderForReceiving: Order
  }
  extend type Mutation {
    createNewOrder(orderDate: String!): Boolean!
    deleteOrder(orderDate: String!): Boolean!
    toggleOrderLock(orderDate: String!): Order!
    updateOrderNote(orderId: ID!, note: String!): Order!
    toggleOrderPlacedWithSupplierId(
      supplierId: ID!
      orderId: ID!
    ): SupplierOrder!
    toggleOrderReceivedWithSupplierId(
      supplierId: ID!
      orderId: ID!
      additionalNotes: String
    ): SupplierOrderResults!
    appendAdditionalNote(
      supplierId: ID!
      orderId: ID!
      additionalNote: String!
    ): SupplierOrderResults!
    editSupplierOrderReceivingNotes(
      supplierId: ID!
      orderId: ID!
      supplierReceivingNotes: String
    ): SupplierOrderResults!
  }
  type Order {
    id: ID!
    orderDate: String!
    note: String
    isLocked: Boolean!
    items: [Item!]
    userId: User!
  }
  type SupplierOrder {
    wasOrderPlaced: Boolean!
    wasOrderReceived: Boolean!
    additionalNotes: String
    supplierReceivingNotes: String
    orderId: Int!
    supplierId: Int!
    notificationSendingError: Boolean
  }
  type SupplierOrderError {
    error: String!
  }
`
