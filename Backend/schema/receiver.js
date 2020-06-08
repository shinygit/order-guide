import { gql } from 'apollo-server-express'
export default gql`
  union LoginReceiverResults = Token | LoginReceiverError
  union CreateReceiverResults = Receiver | CreateReceiverError
  union UpdateReceiverResults = Receiver | UpdateReceiverError

  extend type Query {
    receivers: [Receiver]!
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
    login: String!
    receiverName: String!
    receivesForUser: Int!
  }
  type CreateReceiverError {
    loginError: String
    passwordError: String
    receiverNameError: String
    createError: String
  }

  type LoginReceiverError {
    loginError: String
    passwordError: String
  }
  type UpdateReceiverError {
    loginError: String
    passwordError: String
    receiverNameError: String
    updateError: String
  }
`
