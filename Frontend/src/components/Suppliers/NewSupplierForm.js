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
  const [createSupplier] = useMutation(CREATE_NEW_SUPPLIER, {
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
    <div className='flex flex-col w-56'>
      <button
        className='rounded border border-gray-600 bg-gray-300'
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'Cancel' : 'Add New Supplier'}
      </button>
      {isActive && (
        <div className='flex flex-col items-end'>
          <input
            className='rounded border border-gray-400 mt-4 w-40'
            value={newSupplierForm.supplierName}
            name='supplierName'
            placeholder='Supplier Name...'
            onChange={handleChangeInput}
          ></input>
          <button
            className='border rounded border-gray-600 bg-green-100 w-20 mt-2'
            onClick={handleSaveSupplier}
          >
            Save
          </button>
          {errors}
        </div>
      )}
    </div>
  )
}
export default NewSupplierForm
