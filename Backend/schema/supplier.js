import { gql } from 'apollo-server-express'
export default gql`
  union SupplierUpdateResults = Supplier | supplierError
  union SupplierCreateResults = Supplier | supplierError

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
  }

  input supplierInput {
    supplierName: String!
    deliveryDay: DaysOfWeek
    salesPersonName: String
    salesPersonPhoneNumber: String
    officePhoneNumber: String
  }

  extend type Mutation {
    createSupplier(input: supplierInput): SupplierCreateResults!
    deleteSupplier(id: ID!): Boolean!
    updateSupplier(id: ID!, input: supplierInput): SupplierUpdateResults!
  }
  type supplierError {
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
