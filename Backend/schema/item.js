import { gql } from 'apollo-server-express'
export default gql`
  input CreateItemInput {
    itemName: String!
    supplier: String!
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
    isMarketPrice: Boolean
    productNumber: String
    unitSize: String
    itemNote: String
    specialNote: String
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
    isMarketPrice: Boolean
    productNumber: String
    unitSize: String
    itemNote: String
    specialNote: String
    previousOrders(count: Int): [Int]
  }

  extend type Subscription {
    itemChanged: ItemChanged!
  }

  type ItemChanged {
    item: Item!
  }
`
