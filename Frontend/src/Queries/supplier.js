import gql from 'graphql-tag'
export const GET_SUPPLIERS = gql`
  query Suppliers {
    suppliers {
      id
      supplierName
      deliveryDay
      salesPersonName
      salesPersonPhoneNumber
      officePhoneNumber
      salesPersonEmail
    }
  }
`
export const GET_SUPPLIERS_WITH_ORDER_STATUS = gql`
  query Suppliers($orderId: ID!) {
    suppliers {
      id
      supplierName
      deliveryDay
      salesPersonName
      salesPersonPhoneNumber
      officePhoneNumber
      salesPersonEmail
      wasOrderPlaced(orderId: $orderId)
    }
  }
`
