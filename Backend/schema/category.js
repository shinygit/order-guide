import { gql } from 'apollo-server-express'
export default gql`
  union CategoryUpdateResults = Category | CategoryError
  union CategoryCreateResults = Category | CategoryError
  union CategoryDeleteResults = Category | CategoryError

  extend type Query {
    categories: [Category]
    category(id: ID!): Category!
  }

  type Category {
    id: ID!
    categoryName: String!
  }

  input categoryInput {
    categoryName: String!
  }

  extend type Mutation {
    createCategory(input: categoryInput): CategoryCreateResults!
    deleteCategory(id: ID!): CategoryDeleteResults!
    updateCategory(id: ID!, input: categoryInput): CategoryUpdateResults!
  }
  type CategoryError {
    error: String!
  }
`
