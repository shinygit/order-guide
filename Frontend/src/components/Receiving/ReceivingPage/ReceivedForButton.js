import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const TOGGLE_ORDER_RECEIVED = gql`
  mutation ToggleOrderReceivedWithSupplierId(
    $supplierId: ID!
    $orderId: ID!
    $additionalNotes: String
  ) {
    toggleOrderReceivedWithSupplierId(
      supplierId: $supplierId
      orderId: $orderId
      additionalNotes: $additionalNotes
    ) {
      ... on SupplierOrderError {
        error
      }
      ... on SupplierOrder {
        wasOrderReceived
        additionalNotes
        orderId
        supplierId
        notificationSendingError
      }
    }
  }
`

const ReceivedForButton = ({
  activeSupplier,
  orderId,
  activeSupplierReceivedSubmitted,
  additionalNotesForm,
  items,
}) => {
  const [toggleOrderReceivedWithSupplierId, { data, loading }] = useMutation(
    TOGGLE_ORDER_RECEIVED
  )

  const [error, setError] = useState('')
  useEffect(() => setError(''), [setError, activeSupplier, items])

  const filteredItems = items.filter(
    (item) =>
      item.supplier === activeSupplier.supplierName &&
      item.orderAmount !== 0 &&
      item.orderAmount !== null
  )

  const handleToggleOrderReceivedWithSupplierId = () => {
    if (filteredItems.some((item) => item.quantityReceived === null)) {
      return setError('Looks like an item has not been checked in.')
    }
    if (
      filteredItems.some(
        (item) => item.quantityReceived < item.orderAmount && !item.receiverNote
      )
    ) {
      return setError(
        'If an item was shorted please flag the item with a reason.'
      )
    }
    if (
      window.confirm(
        'Once you submit you will have to confirm every change for this supplier.'
      )
    ) {
      toggleOrderReceivedWithSupplierId({
        variables: {
          supplierId: activeSupplier.id,
          orderId: orderId,
          additionalNotes: additionalNotesForm[activeSupplier.id].field,
        },
      })
    }
  }
  return (
    <>
      {error ? <span className='text-2xl text-red-700'>{error}</span> : null}

      {data?.toggleOrderReceivedWithSupplierId?.error ? (
        <span className='text-2xl text-red-700'>
          {data?.toggleOrderReceivedWithSupplierId?.error}
        </span>
      ) : null}

      {data?.toggleOrderReceivedWithSupplierId?.notificationSendingError ? (
        <span className='text-2xl text-red-700'>
          Notification may not have been sent! Call to confirm!
        </span>
      ) : null}
      {activeSupplierReceivedSubmitted ? (
        <button className='w-6/12 p-1 my-8 font-bold text-gray-600 bg-gray-300 rounded shadow'>
          <div className='flex items-center justify-around'>
            {`Submitted for ${activeSupplier.supplierName}`}
            <svg
              className='text-green-500 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
            >
              <path d='M25 5H5v30h30V17.5h5V40H0V0h25v5zm-.98 18.03l-5.8 5.79L7.49 18.09l5.8-5.79 4.93 4.93L31.7 3.75l5.8 5.8-13.48 13.48z' />
            </svg>
          </div>
        </button>
      ) : (
        <button
          onClick={handleToggleOrderReceivedWithSupplierId}
          disabled={loading}
          className='w-6/12 p-1 my-8 font-bold text-gray-100 bg-blue-700 rounded shadow disabled:opacity-50'
        >
          {`Submit for ${activeSupplier.supplierName}`}
        </button>
      )}
    </>
  )
}

export default ReceivedForButton
