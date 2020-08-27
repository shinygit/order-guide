import gql from 'graphql-tag'
export const FILTER_QUERY = gql`
  query activeFilters {
    filter {
      searchTerm @client
      filterName @client
      filterType @client
      hideAllZeroOrderAmount @client
      hideInfrequent @client
    }
  }
`
