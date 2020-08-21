import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SUPPLIERS_WITH_ORDER_STATUS } from '../../Queries/supplier'
import TextareaAutosize from 'react-textarea-autosize'

const EDIT_SUPPLIER_WEEKLY_NOTE = gql`
  mutation EditSupplierOrderReceivingNotes(
    $supplierId: ID!
    $orderId: ID!
    $supplierReceivingNotes: String
  ) {
    editSupplierOrderReceivingNotes(
      supplierId: $supplierId
      orderId: $orderId
      supplierReceivingNotes: $supplierReceivingNotes
    ) {
      ... on SupplierOrderError {
        error
      }
      ... on SupplierOrder {
        supplierId
        orderId
        supplierReceivingNotes
      }
    }
  }
`
const SupplierWeeklyNotes = ({
  supplier,
  orderId,
  setSupplierReceivingNotesInputObject,
  supplierReceivingNotesInputObject,
}) => {
  const [editSupplierOrderReceivingNotes, { data }] = useMutation(
    EDIT_SUPPLIER_WEEKLY_NOTE,
    {
      refetchQueries: [
        {
          query: GET_SUPPLIERS_WITH_ORDER_STATUS,
          variables: { orderId: orderId },
        },
      ],
    }
  )

  useEffect(() => {
    if (supplier) {
      const input = supplierReceivingNotesInputObject[supplier.id + 'field']
      if (!input) {
        setSupplierReceivingNotesInputObject(
          (supplierReceivingNotesInputObject) => {
            return {
              ...supplierReceivingNotesInputObject,
              [supplier.id + 'field']: supplier.supplierReceivingNotes || '',
              [supplier.id + 'isEditing']: false,
            }
          }
        )
      }
    }
  }, [supplier])

  const handleEditClick = () => {
    setSupplierReceivingNotesInputObject({
      ...supplierReceivingNotesInputObject,
      [supplier.id + 'isEditing']: true,
    })
  }
  const handleSaveClick = () => {
    editSupplierOrderReceivingNotes({
      variables: {
        orderId: orderId,
        supplierId: supplier.id,
        supplierReceivingNotes:
          supplierReceivingNotesInputObject[supplier.id + 'field'],
      },
    })
    setSupplierReceivingNotesInputObject({
      ...supplierReceivingNotesInputObject,
      [supplier.id + 'isEditing']: false,
    })
  }

  if (supplierReceivingNotesInputObject[supplier.id + 'isEditing']) {
    return (
      <div className=''>
        <div className='flex justify-between'>
          <span>Supplier Receiving Notes:</span>
          <button className={buttonStyle} onClick={handleSaveClick}>
            Save
          </button>
        </div>
        <TextareaAutosize
          className='w-full'
          value={supplierReceivingNotesInputObject[supplier.id + 'field']}
          onChange={(e) =>
            setSupplierReceivingNotesInputObject({
              ...supplierReceivingNotesInputObject,
              [supplier.id + 'field']: e.target.value,
            })
          }
        />
      </div>
    )
  }

  if (!supplier.supplierReceivingNotes) {
    return (
      <button
        className={`${buttonStyle} self-center`}
        onClick={handleEditClick}
      >
        Add Supplier Receiving Note
      </button>
    )
  }

  if (!supplierReceivingNotesInputObject[supplier.id + 'isEditing']) {
    return (
      <div className='whitespace-pre-wrap'>
        <div className='flex justify-between'>
          <span>Supplier Receiving Notes:</span>
          <button className={buttonStyle} onClick={handleEditClick}>
            Edit
          </button>
        </div>
        {supplier.supplierReceivingNotes}
      </div>
    )
  }
}

export default SupplierWeeklyNotes

const buttonStyle = 'border border-black rounded bg-gray-100 px-1 shadow'
