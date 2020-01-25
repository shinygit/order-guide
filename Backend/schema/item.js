import { gql } from 'apollo-server-express'
export default gql`
  extend type Query {
    items: [Item!]!
    item(id: ID!): Item!
  }
  extend type Mutation {
    createItem(itemName: String!, orderDate: String!): Item!
    deleteItem(id: ID!): Boolean!
    updateItem(id: ID!, orderAmount: Int): Item!
  }
  type Item {
    id: ID!
    itemName: String!
    supplier: String!
    location: String!
    buildTo: Int!
    orderAmount: Int
    showEditForm: Boolean!
    orderDate: String!
    itemId: String!
    userId: User!
  }

  extend type Subscription {
    orderChanged: OrderChanged!
  }

  type OrderChanged {
    item: Item!
  }
`
