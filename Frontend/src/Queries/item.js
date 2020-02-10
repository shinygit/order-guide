import gql from 'graphql-tag'

export const EDIT_ITEM = gql`
  mutation updateItem($id: ID!, $input: UpdateItemInput!) {
    updateItem(id: $id, input: $input) {
      id
      itemName
      orderAmount
      supplier
      location
      buildTo
      previousOrders(count: 2)
      showEditForm @client
    }
  }
`
export const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`

export const GET_LATEST_ORDER = gql`
  query Orders($orderDepth: Int!) {
    orders(orderDepth: $orderDepth) {
      orderDate
      items {
        id
        itemName
        orderAmount
        supplier
        location
        buildTo
        previousOrders(count: 2)
        showEditForm @client
      }
    }
  }
`
