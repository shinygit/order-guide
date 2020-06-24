import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { set } from 'mongoose'

const CONFIRM_METHOD = gql`
  mutation ConfirmNotificationMethod($id: ID!, $confirmationCode: String!) {
    confirmNotificationMethod(id: $id, confirmationCode: $confirmationCode) {
      ... on NotificationMethodError {
        error
      }
      ... on NotificationMethod {
        id
        confirmed
      }
    }
  }
`
const ConfirmMethod = ({ method }) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [confirmNotificationMethod, { data, loading }] = useMutation(
    CONFIRM_METHOD
  )

  const handleSubmit = () => {
    if (input.length === 0) return setError('Please enter a confirmation Code')
    confirmNotificationMethod({
      variables: { id: method.id, confirmationCode: input },
    })
  }
  return (
    <div className='mt-2'>
      <div>
        <span>Confirmation Code:</span>
        <input
          placeholder='#####'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setError('')}
          className='rounded p-1 mx-1 border border-gray-300 w-16'
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className='border border-green-600 bg-green-100 p-1 rounded disabled:opacity-50'
        >
          Submit
        </button>
      </div>
      <span className='text-red-600'>
        {data?.confirmNotificationMethod.error}
        {error}
      </span>
    </div>
  )
}

export default ConfirmMethod
