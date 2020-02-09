import gql from 'graphql-tag'
import { GET_LATEST_ORDER } from '../Queries/item'
import produce from 'immer'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  extend type Item {
    showEditForm: Boolean!
  }

  extend type Mutation {
    toggleShowEditItemForm(id: ID!): Boolean!
  }
`

export const resolvers = {
  Item: {
    showEditForm: (item, _, { cache }) => {
      if (!item.showEditForm) return false
    }
  },
  Mutation: {
    toggleShowEditItemForm: (_, { id }, { client }) => {
      const queryResults = client.readQuery({
        query: GET_LATEST_ORDER,
        variables: { orderDepth: 1 }
      })
      console.log(queryResults)
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
    }
  }
}
