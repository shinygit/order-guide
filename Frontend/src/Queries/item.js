import gql from 'graphql-tag'

export const EDIT_ITEM = gql`
  mutation updateItem($id: ID!, $input: UpdateItemInput!) {
    updateItem(id: $id, input: $input) {
      id
      itemName
      supplier
      location
      buildTo
      quantityOnHand
      quantityReceived
      orderAmount
      itemId
      unitPriceInPennies
      isMarketPrice
      productNumber
      unitSize
      itemNote
      specialNote
      receivingNote
      previousOrders
      showEditForm @client
      flaggedByReceiver
      receiverNote
    }
  }
`
export const CREATE_ITEM = gql`
  mutation createItem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      itemName
      orderAmount
      supplier
      location
      buildTo
      quantityOnHand
      quantityReceived
      orderAmount
      unitPriceInPennies
      isMarketPrice
      productNumber
      unitSize
      itemNote
      specialNote
      receivingNote
      previousOrders
      showEditForm @client
      isExpanded @client
      flaggedByReceiver
      receiverNote
    }
  }
`

export const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`

export const UPDATE_ITEM_ORDER_AMOUNT = gql`
  mutation updateItemOrderAmount($id: ID!, $orderAmount: Int!)
    @serialize(key: ["updateOrderAmount"]) {
    updateItemOrderAmount(id: $id, orderAmount: $orderAmount) {
      id
      orderAmount
    }
  }
`

export const UPDATE_ITEM_RECEIVE_AMOUNT = gql`
  mutation updateItemReceiveAmount($id: ID!, $quantityReceived: Int!)
    @serialize(key: ["quantityReceived"]) {
    updateItemReceiveAmount(id: $id, quantityReceived: $quantityReceived) {
      id
      quantityReceived
    }
  }
`

export const GET_LATEST_ORDER = gql`
  query Orders($orderDepth: Int!) {
    orders(orderDepth: $orderDepth) {
      id
      orderDate
      items {
        id
        itemName
        orderAmount
        supplier
        location
        buildTo
        quantityOnHand
        quantityReceived
        orderAmount
        unitPriceInPennies
        isMarketPrice
        productNumber
        unitSize
        itemNote
        specialNote
        receivingNote
        previousOrders
        showEditForm @client
        isExpanded @client
        flaggedByReceiver
        receiverNote
      }
    }
  }
`
