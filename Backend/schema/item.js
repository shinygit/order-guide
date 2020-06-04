import { gql } from 'apollo-server-express'
export default gql`
  input CreateItemInput {
    itemName: String!
    supplier: String
    location: String!
    buildTo: Int!
  }
  input UpdateItemInput {
    itemName: String
    supplier: String
    location: String
    buildTo: Int
    quantityOnHand: Int
    quantityReceived: Int
    orderAmount: Int
    itemId: String
    unitPriceInPennies: Int
    isMarketPrice: Boolean!
    productNumber: String
    unitSize: String
    itemNote: String
    specialNote: String
    receivingNote: String
    flaggedByReceiver: String
  }
  extend type Query {
    items: [Item!]!
    item(id: ID!): Item!
  }
  extend type Mutation {
    createItem(input: CreateItemInput): Item!
    deleteItem(id: ID!): Boolean!
    updateItem(id: ID!, input: UpdateItemInput): Item!
    updateItemOrderAmount(id: ID!, orderAmount: Int): Item!
    updateItemReceiveAmount(id: ID!, quantityReceived: Int!): Item!
    toggleFlaggedByReceiver(id: ID!, flaggedByReceiver: String): Item!
  }
  type Item {
    id: ID!
    itemName: String!
    supplier: String
    location: String
    buildTo: Int
    quantityOnHand: Int
    quantityReceived: Int
    orderAmount: Int
    itemId: String!
    userId: User!
    unitPriceInPennies: Int
    isMarketPrice: Boolean!
    productNumber: String
    unitSize: String
    itemNote: String
    specialNote: String
    receivingNote: String
    previousOrders(count: Int): [Int]
    flaggedByReceiver: String
  }

  extend type Subscription {
    itemChanged: ItemChanged!
  }

  type ItemChanged {
    item: Item!
  }
`
