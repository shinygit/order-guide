const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Item {
    id: ID!
    itemName: String
    supplier: String
    location: String
    buildTo: Int
    order: Int
    showEditForm: Boolean
    isLocked: Boolean
    submittedDate: Float
    itemID: String
    user: String
  }

  type Query {
    items: [Item!]
    item(id: ID!): Item
  }
`
module.exports = typeDefs
