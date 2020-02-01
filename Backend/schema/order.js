import { gql } from 'apollo-server-express'
export default gql`
  extend type Query {
    orders(orderDepth: Int!): [Order!]
  }
  type Order {
    orderDate: String!
    items: [Item!]
    userId: User!
  }
`
