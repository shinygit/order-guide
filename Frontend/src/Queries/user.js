import gql from 'graphql-tag'

export const GET_ME = gql`
  query me {
    me {
      ... on Receiver {
        __typename
        receiverName
      }
      ... on User {
        __typename
      }
    }
  }
`
