import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SUPPLIERS } from '../../Queries/supplier'

const CREATE_NEW_SUPPLIER = gql`
  mutation CreateSupplier($input: supplierInput) {
    createSupplier(input: $input) {
      ... on supplierError {
        error
      }
      ... on Supplier {
        id
        supplierName
        deliveryDay
        salesPersonName
        salesPersonPhoneNumber
        officePhoneNumber
      }
    }
  }
`

const NewSupplierForm = () => {
  const [createSupplier, { data }] = useMutation(CREATE_NEW_SUPPLIER, {
    update(cache, { data: { createSupplier } }) {
      const { suppliers } = cache.readQuery({ query: GET_SUPPLIERS })
      cache.writeQuery({
        query: GET_SUPPLIERS,
        data: { suppliers: suppliers.concat([createSupplier]) },
      })
    },
  })
  const [isActive, setIsActive] = useState(false)
  const [newSupplierForm, setNewSupplierForm] = useState({
    supplierName: '',
  })
  const handleChangeInput = (event) => {
    setNewSupplierForm({
      ...newSupplierForm,
      [event.target.name]: event.target.value,
    })
  }
  const handleSaveSupplier = () => {
    createSupplier({ variables: { input: newSupplierForm } })
    setIsActive(false)
    setNewSupplierForm({ supplierName: '' })
  }
  return (
    <div>
      <button onClick={() => setIsActive(!isActive)}>New Supplier</button>
      {isActive && (
        <div>
          <input
            value={newSupplierForm.supplierName}
            name='supplierName'
            onChange={handleChangeInput}
          ></input>
          <button onClick={handleSaveSupplier}>Save</button>
        </div>
      )}
    </div>
  )
}
export default NewSupplierForm
