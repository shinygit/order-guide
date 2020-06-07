import { gql } from 'apollo-server-express'
export default gql`
  union LoginReceiverResults = Token | LoginReceiverError
  union CreateReceiverResults = Receiver | CreateReceiverError
  union UpdateReceiverResults = Receiver | UpdateReceiverError

  extend type Query {
    Receivers: [Receiver]!
  }
  extend type Mutation {
    createReceiver(
      login: String!
      password: String!
      receiverName: String!
    ): CreateReceiverResults!
    loginReceiver(login: String!, password: String!): LoginReceiverResults!
    updateReceiver(
      id: ID!
      login: String
      password: String
      receiverName: String
    ): UpdateReceiverResults!
  }

  type Receiver {
    id: ID!
    receiverName: String!
    receivesForUser: Int!
  }
  type CreateReceiverError {
    loginError: String
    passwordError: String
  }

  type LoginReceiverError {
    loginError: String
    passwordError: String
  }
  type UpdateReceiverError {
    loginError: String
    passwordError: String
    updateError: String
  }
`
