import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const TOGGLE_ORDER_RECEIVED = gql`
  mutation toggleOrderReceivedWithSupplierId($supplierId: ID!, $orderId: ID!) {
    toggleOrderReceivedWithSupplierId(
      supplierId: $supplierId
      orderId: $orderId
    ) {
      wasOrderReceived
      orderId
      supplierId
    }
  }
`

const ReceivedForButton = ({
  activeSupplier,
  orderId,
  activeSupplierReceivedSubmitted,
}) => {
  const [toggleOrderReceivedWithSupplierId] = useMutation(TOGGLE_ORDER_RECEIVED)

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
        },
      })
    }
  }

  return activeSupplierReceivedSubmitted ? (
    <button className='rounded bg-gray-300 font-bold text-gray-600 shadow w-6/12 p-1 mt-8'>{`Submitted for ${activeSupplier.supplierName}`}</button>
  ) : (
    <button
      onClick={handleToggleOrderReceivedWithSupplierId}
      className='rounded bg-blue-700 font-bold text-gray-100 shadow w-6/12 p-1 mt-8'
    >{`Submit for ${activeSupplier.supplierName}`}</button>
  )
}

export default ReceivedForButton
