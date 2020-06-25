import React from 'react'
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
}) => {
  const [toggleOrderReceivedWithSupplierId, { data, loading }] = useMutation(
    TOGGLE_ORDER_RECEIVED
  )
  const handleToggleOrderReceivedWithSupplierId = () => {
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
      {activeSupplierReceivedSubmitted ? (
        <button className='rounded bg-gray-300 font-bold text-gray-600 shadow w-6/12 p-1 my-8'>
          <div className='flex justify-around items-center'>
            {`Submitted for ${activeSupplier.supplierName}`}
            <svg
              className='fill-current text-green-500'
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
          className='rounded bg-blue-700 font-bold text-gray-100 shadow w-6/12 p-1 my-8 disabled:opacity-50'
        >
          {`Submit for ${activeSupplier.supplierName}`}
        </button>
      )}
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
    </>
  )
}

export default ReceivedForButton
