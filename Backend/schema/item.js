import { gql } from 'apollo-server-express'
export default gql`
  extend type Query {
    items: [Item!]!
    item(id: ID!): Item!
  }
  extend type Mutation {
    createItem(itemName: String!): Item!
    deleteItem(id: ID!): Boolean!
  }
  type Item {
    id: ID!
    itemName: String!
    supplier: String
    location: String
    buildTo: Int
    order: Int
    showEditForm: Boolean
    isLocked: Boolean
    submittedDate: String
    itemId: String
    userId: User!
  }
`
