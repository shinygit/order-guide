import { gql } from 'apollo-server-express'
export default gql`
  union SupplierUpdateResults = Supplier | SupplierError
  union SupplierCreateResults = Supplier | SupplierError
  union SupplierDeleteResults = Supplier | SupplierError

  extend type Query {
    suppliers: [Supplier]
    supplier(id: ID!): Supplier!
  }

  type Supplier {
    id: ID!
    supplierName: String!
    deliveryDay: DaysOfWeek
    salesPersonName: String
    salesPersonPhoneNumber: String
    officePhoneNumber: String
    salesPersonEmail: String
    wasOrderPlaced(orderId: ID!): Boolean!
    wasOrderReceived(orderId: ID!): Boolean!
    additionalNotes(orderId: ID!): String
  }

  input supplierInput {
    supplierName: String!
    deliveryDay: DaysOfWeek
    salesPersonName: String
    salesPersonPhoneNumber: String
    officePhoneNumber: String
    salesPersonEmail: String
  }

  extend type Mutation {
    createSupplier(input: supplierInput): SupplierCreateResults!
    deleteSupplier(id: ID!): SupplierDeleteResults!
    updateSupplier(id: ID!, input: supplierInput): SupplierUpdateResults!
  }
  type SupplierError {
    error: String!
  }
  enum DaysOfWeek {
    Sunday
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
  }
`
