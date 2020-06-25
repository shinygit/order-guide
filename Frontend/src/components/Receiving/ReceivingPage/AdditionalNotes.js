import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const APPEND_NOTES = gql`
  mutation AppendAdditionalNote(
    $supplierId: ID!
    $orderId: ID!
    $additionalNote: String!
  ) {
    appendAdditionalNote(
      supplierId: $supplierId
      orderId: $orderId
      additionalNote: $additionalNote
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

const AdditionalNotes = ({
  activeSupplier,
  additionalNotesForm,
  setAdditionalNotesForm,
  activeSupplierReceivedSubmitted,
  orderId,
}) => {
  const [appendAdditionalNote, { data, loading }] = useMutation(APPEND_NOTES)
  const handleChangeInput = (event) => {
    setAdditionalNotesForm({
      ...additionalNotesForm,
      [activeSupplier.id]: {
        ...additionalNotesForm[activeSupplier.id],
        field: event.target.value,
      },
    })
  }
  const handleAppendNotes = () => {
    if (window.confirm('This will send an additional notification.')) {
      appendAdditionalNote({
        variables: {
          supplierId: activeSupplier.id,
          orderId: orderId,
          additionalNote: `${
            additionalNotesForm[activeSupplier.id].current && '\n'
          }${additionalNotesForm[activeSupplier.id].field}`,
        },
      })
    }
  }
  return (
    <div className='w-11/12'>
      <span className='text-lg'>Additional Notes</span>
      <div className='p-1 border bg-white'>
        <span className='whitespace-pre-wrap'>
          {additionalNotesForm[activeSupplier.id].current}
        </span>
        <textarea
          className='w-full resize-none outline-none whitespace-pre-wrap'
          placeholder={
            activeSupplierReceivedSubmitted
              ? `Additional notes will be appended to any notes above.`
              : `Extra items received, substitutions, something you think might be missing, etc...`
          }
          name='additionalNotesForm'
          value={additionalNotesForm[activeSupplier.id].field}
          onChange={handleChangeInput}
        />
      </div>
      {activeSupplierReceivedSubmitted &&
        additionalNotesForm[activeSupplier.id].field && (
          <button
            onClick={handleAppendNotes}
            disabled={loading}
            className='rounded bg-blue-700 font-bold text-gray-100 shadow w-6/12 p-1 my-8 disabled:opacity-50'
          >
            Append Additional Notes
          </button>
        )}
    </div>
  )
}
export default AdditionalNotes
