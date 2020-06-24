import gql from 'graphql-tag'

export const GET_NOTIFICATION_METHODS = gql`
  query NotificationMethods {
    notificationMethods {
      id
      phoneNumber
      email
      confirmed
    }
  }
`
