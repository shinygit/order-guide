import gql from 'graphql-tag'

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      categoryName
    }
  }
`
