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
