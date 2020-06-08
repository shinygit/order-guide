import gql from 'graphql-tag'

export const GET_RECEIVERS = gql`
  query receivers {
    receivers {
      id
      login
      receiverName
    }
  }
`
