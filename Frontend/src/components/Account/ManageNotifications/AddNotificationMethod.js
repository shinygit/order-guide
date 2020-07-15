import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { GET_NOTIFICATION_METHODS } from '../../../Queries/notificationMethod'

const ADD_NOTIFICATION_METHOD = gql`
  mutation AddNotificationMethod($email: String, $phoneNumber: String) {
    addNotificationMethod(email: $email, phoneNumber: $phoneNumber) {
      ... on NotificationMethodError {
        error
      }
      ... on NotificationMethod {
        id
        email
        phoneNumber
        confirmed
      }
    }
  }
`
const AddNotificationMethod = ({}) => {
  const [addNotificationMethod, { loading }] = useMutation(
    ADD_NOTIFICATION_METHOD,
    {
      update(cache, { data: { addNotificationMethod } }) {
        if (addNotificationMethod.__typename === 'NotificationMethod') {
          const { notificationMethods } = cache.readQuery({
            query: GET_NOTIFICATION_METHODS,
          })
          cache.writeQuery({
            query: GET_NOTIFICATION_METHODS,
            data: {
              notificationMethods: notificationMethods.concat([
                addNotificationMethod,
              ]),
            },
          })
        }
      },
    }
  )

  const [method, setMethod] = useState('email')
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await addNotificationMethod({
      variables: {
        [method]: input,
      },
    })

    if (result.data.addNotificationMethod.error) {
      setError(result.data.addNotificationMethod.error)
    }
    if (result.data.addNotificationMethod.id) {
      setInput('')
    }
  }

  return (
    <div className='w-56'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col border border-gray-300 bg-white p-3'
      >
        <label htmlFor='method'>Notification method:</label>
        <div className='flex mb-3 items-center'>
          <select
            className='appearance-none w-full bg-white border border-gray-400 -mr-6 p-1 rounded'
            onChange={(e) => setMethod(e.target.value)}
            name='method'
          >
            <option value='email'>Email</option>
            {/* <option value='phoneNumber'>Phone Number</option> */}
          </select>

          <svg
            className='h-4 pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>

        <label className='flex flex-col text-gray-800 text-sm mb-2'>
          {method === 'email' ? 'Email' : 'Phone Number'}
          <input
            className='mt-1 rounded p-1 border border-gray-300'
            type='text'
            name='receiverName'
            value={input}
            onFocus={() => setError('')}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <span className='text-red-600'>{error}</span>
        <input
          type='submit'
          value='Add Method'
          disabled={loading}
          className='w-full rounded p-1 bg-green-500 text-white font-bold mt-2 disabled:opacity-50'
        />
      </form>
    </div>
  )
}

export default AddNotificationMethod
