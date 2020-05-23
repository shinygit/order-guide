import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SUPPLIERS } from '../../Queries/supplier'

const CREATE_NEW_SUPPLIER = gql`
  mutation CreateSupplier($input: supplierInput) {
    createSupplier(input: $input) {
      ... on SupplierError {
        error
      }
      ... on Supplier {
        id
        supplierName
        deliveryDay
        salesPersonName
        salesPersonPhoneNumber
        officePhoneNumber
        salesPersonEmail
      }
    }
  }
`

const NewSupplierForm = () => {
  const [createSupplier, { data }] = useMutation(CREATE_NEW_SUPPLIER, {
    update(cache, { data: { createSupplier } }) {
      if (createSupplier.__typename === 'Supplier') {
        const { suppliers } = cache.readQuery({ query: GET_SUPPLIERS })
        cache.writeQuery({
          query: GET_SUPPLIERS,
          data: { suppliers: suppliers.concat([createSupplier]) },
        })
      }
    },
  })
  const [isActive, setIsActive] = useState(false)
  const [newSupplierForm, setNewSupplierForm] = useState({
    supplierName: '',
  })
  const [errors, setErrors] = useState('')
  const handleChangeInput = (event) => {
    setNewSupplierForm({
      ...newSupplierForm,
      [event.target.name]: event.target.value,
    })
  }
  const handleSaveSupplier = async () => {
    const result = await createSupplier({
      variables: { input: newSupplierForm },
    })
    if (result.data.createSupplier.error) {
      setErrors(result.data.createSupplier.error)
    }
    if (result.data.createSupplier.id) {
      setErrors('')
      setIsActive(false)
      setNewSupplierForm({ supplierName: '' })
    }
  }
  return (
    <div className='flex flex-col'>
      <button onClick={() => setIsActive(!isActive)}>New Supplier</button>
      {isActive && (
        <div className='flex flex-col'>
          <input
            value={newSupplierForm.supplierName}
            name='supplierName'
            onChange={handleChangeInput}
          ></input>
          <button onClick={handleSaveSupplier}>Save</button>
          {errors}
        </div>
      )}
    </div>
  )
}
export default NewSupplierForm
