import { gql } from 'apollo-server-express'
export default gql`
  union NotificationMethodResult = NotificationMethod | NotificationMethodError
  extend type Query {
    notificationMethods: [NotificationMethod]!
  }
  extend type Mutation {
    addNotificationMethod(
      phoneNumber: String
      email: String
    ): NotificationMethodResult!
    confirmNotificationMethod(
      id: ID!
      confirmationCode: String!
    ): NotificationMethodResult
    deleteNotificationMethod(id: ID!): Boolean!
  }
  type NotificationMethod {
    id: ID!
    phoneNumber: String
    email: String
    confirmed: Boolean!
  }
  type NotificationMethodError {
    error: String!
  }
`
