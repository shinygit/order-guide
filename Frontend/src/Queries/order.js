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
  query orderDates($orderDepth: Int!) {
    orders(orderDepth: $orderDepth) {
      id
      isLocked
      orderDate
    }
  }
`
export const GET_IS_ORDER_PLACED = gql`
  query SupplierOrder($supplierId: ID!, $orderId: ID!) {
    supplierOrder(supplierId: $supplierId, orderId: $orderId) {
      wasOrderPlaced
      orderId
      supplierId
    }
  }
`
export const ORDER_FOR_RECEIVING = gql`
  query {
    orderForReceiving {
      orderDate
      items {
        id
        itemName
        orderAmount
        supplier
        quantityReceived
        receivingNote
        flaggedByReceiver
        receiverNote
      }
    }
  }
`
