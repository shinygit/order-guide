import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { GET_RECEIVERS } from '../../Queries/receiver'

const CREATE_RECEIVER = gql`
  mutation createReceiver(
    $receiverName: String!
    $login: String!
    $password: String!
  ) {
    createReceiver(
      receiverName: $receiverName
      login: $login
      password: $password
    ) {
      ... on Receiver {
        id
        receiverName
        login
      }
      ... on CreateReceiverError {
        loginError
        passwordError
        createError
        receiverNameError
      }
    }
  }
`

const AddReceiver = () => {
  const [createReceiver] = useMutation(CREATE_RECEIVER, {
    update(cache, { data: { createReceiver } }) {
      if (createReceiver.__typename === 'Receiver') {
        const { receivers } = cache.readQuery({ query: GET_RECEIVERS })
        cache.writeQuery({
          query: GET_RECEIVERS,
          data: { receivers: receivers.concat([createReceiver]) },
        })
      }
    },
  })
  const [addReceiverFields, setAddReceiverFields] = useState({
    login: '',
    loginError: '',
    receiverName: '',
    receiverNameError: '',
    password: '',
    passwordError: '',
    createError: '',
  })
  const handleChangeInput = (event) => {
    setAddReceiverFields({
      ...addReceiverFields,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await createReceiver({
      variables: {
        receiverName: addReceiverFields.receiverName,
        login: addReceiverFields.login,
        password: addReceiverFields.password,
      },
    })
    if (result.data.createReceiver) {
      setAddReceiverFields({
        ...addReceiverFields,
        ...result.data.createReceiver,
      })
    }
    if (result.data.createReceiver.id) {
      setAddReceiverFields({
        login: '',
        loginError: '',
        receiverName: '',
        receiverNameError: '',
        password: '',
        passwordErrors: '',
        createError: '',
      })
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col border border-gray-300 bg-white p-3 w-64'
      >
        <label className='flex flex-col text-gray-800 text-sm mb-2'>
          receiver name
          <input
            className='mt-1 rounded p-1 border border-gray-300'
            type='text'
            name='receiverName'
            value={addReceiverFields.receiverName}
            onChange={handleChangeInput}
            onFocus={() =>
              setAddReceiverFields({
                ...addReceiverFields,
                receiverNameError: '',
              })
            }
          />
        </label>
        <span>{addReceiverFields.receiverNameError}</span>
        <label className='flex flex-col text-gray-800 text-sm mb-2'>
          login
          <input
            className='mt-1 rounded p-1 border border-gray-300'
            type='text'
            name='login'
            value={addReceiverFields.login}
            onChange={handleChangeInput}
            onFocus={() =>
              setAddReceiverFields({
                ...addReceiverFields,
                loginError: '',
              })
            }
          />
        </label>
        <span>{addReceiverFields.loginError}</span>
        <label className='flex flex-col text-gray-800 text-sm mb-2'>
          password
          <input
            className='mt-1 rounded p-1 border border-gray-300'
            type='text'
            name='password'
            value={addReceiverFields.password}
            onChange={handleChangeInput}
            onFocus={() =>
              setAddReceiverFields({
                ...addReceiverFields,
                passwordError: '',
              })
            }
          />
        </label>
        <span className='text-red-600'>{addReceiverFields.passwordError}</span>
        <input
          type='submit'
          value='Add Receiver'
          className='w-full rounded p-1 bg-green-500 text-white font-bold mt-2'
        />
      </form>
    </div>
  )
}
export default AddReceiver
