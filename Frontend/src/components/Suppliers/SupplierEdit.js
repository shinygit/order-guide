import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SUPPLIERS } from '../../Queries/supplier'

const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier($id: ID!, $input: supplierInput!) {
    updateSupplier(id: $id, input: $input) {
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
const DELETE_SUPPLIER = gql`
  mutation DeleteSupplier($id: ID!) {
    deleteSupplier(id: $id) {
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

const SupplierEdit = ({ suppliers, selectedCard, setSelectedCard }) => {
  const [formErrors, setFormErrors] = useState('')
  const daysOfTheWeek = [
    { value: '', label: '' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ]

  const [updateSupplier] = useMutation(UPDATE_SUPPLIER)
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER, {
    update: (cache, { data: { deleteSupplier } }) => {
      if (deleteSupplier.id) {
        setSelectedCard('')
        const data = cache.readQuery({ query: GET_SUPPLIERS })
        const newSuppliers = data.suppliers.filter(
          (supplier) => supplier.id !== selectedCard
        )
        const newData = { ...data, suppliers: [...newSuppliers] }
        cache.writeQuery({
          query: GET_SUPPLIERS,
          data: newData,
        })
      }
    },
  })

  const supplier = suppliers.find((supplier) => supplier.id === selectedCard)

  const [supplierForm, setSupplierForm] = useState({
    supplierName: supplier.supplierName,
    deliveryDay: supplier.deliveryDay || '',
    salesPersonName: supplier.salesPersonName || '',
    salesPersonPhoneNumber: supplier.salesPersonPhoneNumber || '',
    officePhoneNumber: supplier.officePhoneNumber || '',
    salesPersonEmail: supplier.salesPersonEmail || '',
  })

  useEffect(() => {
    setSupplierForm({
      supplierName: supplier.supplierName,
      deliveryDay: supplier.deliveryDay || '',
      salesPersonName: supplier.salesPersonName || '',
      salesPersonPhoneNumber: supplier.salesPersonPhoneNumber || '',
      officePhoneNumber: supplier.officePhoneNumber || '',
      salesPersonEmail: supplier.salesPersonEmail || '',
    })
  }, [selectedCard, supplier])
  const handleChangeInput = (event) => {
    setSupplierForm({
      ...supplierForm,
      [event.target.name]: event.target.value,
    })
  }
  const handleCancel = () => {
    setSelectedCard('')
    setSupplierForm({
      supplierName: supplier.supplierName,
      deliveryDay: supplier.deliveryDay,
      salesPersonName: supplier.salesPersonName,
      salesPersonPhoneNumber: supplier.salesPersonPhoneNumber,
      officePhoneNumber: supplier.officePhoneNumber,
      salesPersonEmail: supplier.salesPersonEmail,
    })
    setFormErrors('')
  }
  const handleSave = async () => {
    const result = await updateSupplier({
      variables: {
        id: supplier.id,
        input: {
          ...supplierForm,
          deliveryDay:
            supplierForm.deliveryDay === '' ? null : supplierForm.deliveryDay,
        },
      },
    })
    if (result.data.updateSupplier.error) {
      setFormErrors(result.data.updateSupplier.error)
    }
    if (!result.data.updateSupplier.error) setSelectedCard('')
  }

  const handleDelete = async () => {
    const result = await deleteSupplier({ variables: { id: supplier.id } })
    if (result.data.deleteSupplier.error)
      setFormErrors(result.data.deleteSupplier.error)
  }
  return (
    <div className='max-w-md text-gray-900'>
      <div className='flex flex-col border-2 rounded p-2 bg-gray-200 border-blue-700 shadow'>
        <div className='text-2xl font-semibold self-center'>
          <input
            type='text'
            name='supplierName'
            value={supplierForm.supplierName}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className='grid grid-cols-2'>
          <div className='flex flex-col'>
            <span className='text-gray-700 text-sm pr-2'>office phone</span>
            <input
              className='w-48 ml-4'
              type='text'
              name='officePhoneNumber'
              value={supplierForm.officePhoneNumber}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div className='flex flex-col ml-5'>
            <span className='text-gray-700 text-sm -ml-4'>sales person</span>
            <input
              className='w-48'
              type='text'
              name='salesPersonName'
              value={supplierForm.salesPersonName}
              onChange={handleChangeInput}
            ></input>
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col'></div>
          <div className='flex flex-col ml-5'>
            <span className='text-gray-700 text-sm -ml-4'>phone</span>
            <input
              className='w-48'
              type='text'
              name='salesPersonPhoneNumber'
              value={supplierForm.salesPersonPhoneNumber}
              onChange={handleChangeInput}
            ></input>
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col'>
            <span className='text-gray-700 text-sm pr-2'>delivery day</span>
            <select
              className='w-32 ml-4'
              name='deliveryDay'
              value={supplierForm.deliveryDay}
              onChange={handleChangeInput}
            >
              {daysOfTheWeek.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col ml-5'>
            <span className='text-gray-700 text-sm -ml-4'>email</span>
            <input
              className='w-48'
              type='text'
              name='salesPersonEmail'
              value={supplierForm.salesPersonEmail}
              onChange={handleChangeInput}
            ></input>
          </div>
        </div>
      </div>
      <div className='flex justify-around'>
        <button
          className='rounded-b border-2 border-red-400 bg-red-200 p-1'
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className='rounded-b border-2 border-gray-400 bg-gray-200 p-1'
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className='rounded-b border-2 border-green-400 bg-green-200 p-1'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      {formErrors}
    </div>
  )
}
export default SupplierEdit
