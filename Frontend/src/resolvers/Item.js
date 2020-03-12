import gql from 'graphql-tag'
import { GET_LATEST_ORDER } from '../Queries/item'
import produce from 'immer'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  extend type Item {
    showEditForm: Boolean!
    isExpanded: Boolean!
  }

  extend type Mutation {
    toggleShowEditItemForm(id: ID!): Boolean!
    toggleShowExpandedItem(id: ID!): Boolean!
    setItemFilter(filterType: String!, filterName: String!): Boolean!
  }
`

export const resolvers = {
  Item: {
    showEditForm: (item, _, { cache }) => {
      if (!item.showEditForm) return false
    },
    isExpanded: (item, _, { cache }) => {
      if (!item.isExpanded) return false
    }
  },
  Mutation: {
    toggleShowEditItemForm: (_, { id }, { client }) => {
      const queryResults = client.readQuery({
        query: GET_LATEST_ORDER,
        variables: { orderDepth: 1 }
      })
      const { items } = queryResults.orders[0]
      client.writeQuery({
        query: GET_LATEST_ORDER,
        variables: { orderDepth: 1 },
        data: produce(queryResults, x => {
          x.orders[0].items = items.map(item => {
            if (item.id === id) {
              return { ...item, showEditForm: !item.showEditForm }
            }
            return item
          })
        })
      })
    },
    toggleShowExpandedItem: (_, { id }, { client }) => {
      const queryResults = client.readQuery({
        query: GET_LATEST_ORDER,
        variables: { orderDepth: 1 }
      })
      const { items } = queryResults.orders[0]
      client.writeQuery({
        query: GET_LATEST_ORDER,
        variables: { orderDepth: 1 },
        data: produce(queryResults, x => {
          x.orders[0].items = items.map(item => {
            if (item.id === id) {
              return { ...item, isExpanded: !item.isExpanded }
            }
            return item
          })
        })
      })
    },
    setFilter: (_, { filterType, filterName }, { client }) => {
      client.writeData({
        data: { itemFilter: { filterType: filterType, filterName: filterName } }
      })
    }
  }
}
