import gql from 'graphql-tag'
export const CREATE_NEW_ORDER_DATE = gql`
  mutation createNewOrder($orderDate: String!) {
    createNewOrder(orderDate: $orderDate)
  }
`
export const DELETE_ORDER_DATE = gql`
  mutation deleteOrder($orderDate: String!) {
    deleteOrder(orderDate: $orderDate)
  }
`
export const ORDER_DATES = gql`
  query Orders($orderDepth: Int!) {
    orders(orderDepth: $orderDepth) {
      orderDate
    }
  }
`
