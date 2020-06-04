import { gql } from 'apollo-server-express'
export default gql`
  union LoginResults = Token | LoginError
  union RegisterResults = User | RegisterErrors
  union Me = User | Receiver

  extend type Query {
    me: Me
  }

  extend type Mutation {
    signUp(email: String!, password: String!): RegisterResults!
    signIn(login: String!, password: String!): LoginResults!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
    orders: [Order!]
  }
  type RegisterErrors {
    emailError: String
    passwordError: String
  }

  type LoginError {
    emailError: String
    passwordError: String
  }
`
