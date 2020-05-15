import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SUPPLIERS } from '../../Queries/supplier'

const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier($id: ID!, $input: supplierInput!) {
    updateSupplier(id: $id, input: $input) {
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
const DELETE_SUPPLIER = gql`
  mutation DeleteSupplier($id: ID!) {
    deleteSupplier(id: $id) {
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

  const [updateSupplier, { data }] = useMutation(UPDATE_SUPPLIER)
  const [deleteSupplier, { data: deleteData }] = useMutation(DELETE_SUPPLIER, {
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
  })

  useEffect(() => {
    setSupplierForm({
      supplierName: supplier.supplierName,
      deliveryDay: supplier.deliveryDay || '',
      salesPersonName: supplier.salesPersonName || '',
      salesPersonPhoneNumber: supplier.salesPersonPhoneNumber || '',
      officePhoneNumber: supplier.officePhoneNumber || '',
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

    if (!result.data.updateSupplier.error) setFormErrors('')
  }

  const handleDelete = async () => {
    const result = await deleteSupplier({ variables: { id: supplier.id } })
    if (result.data.deleteSupplier.error)
      setFormErrors(result.data.deleteSupplier.error)
  }
  return (
    <div className='flex flex-col w-4/12'>
      <label>
        Supplier Name:
        <input
          type='text'
          name='supplierName'
          value={supplierForm.supplierName}
          onChange={handleChangeInput}
        ></input>
      </label>
      <label>
        Delivery Day:
        <select
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
      </label>
      <label>
        Sales Person:
        <input
          type='text'
          name='salesPersonName'
          value={supplierForm.salesPersonName}
          onChange={handleChangeInput}
        ></input>
      </label>
      <label>
        Sales Person Phone:
        <input
          type='text'
          name='salesPersonPhoneNumber'
          value={supplierForm.salesPersonPhoneNumber}
          onChange={handleChangeInput}
        ></input>
      </label>
      <label>
        Office Phone:
        <input
          type='text'
          name='officePhoneNumber'
          value={supplierForm.officePhoneNumber}
          onChange={handleChangeInput}
        ></input>
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
      {formErrors}

      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}
export default SupplierEdit
