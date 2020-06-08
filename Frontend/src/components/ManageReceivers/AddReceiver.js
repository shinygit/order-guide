import React, { useState, useEffect } from 'react'
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
  const [createReceiver, { data, errors, loading }] = useMutation(
    CREATE_RECEIVER,
    {
      update(cache, { data: { createReceiver } }) {
        if (createReceiver.__typename === 'Receiver') {
          const { receivers } = cache.readQuery({ query: GET_RECEIVERS })
          cache.writeQuery({
            query: GET_RECEIVERS,
            data: { receivers: receivers.concat([createReceiver]) },
          })
        }
      },
    }
  )
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
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label>
          Receiver Name:
          <input
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
        <label>
          Login:
          <input
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
        <label>
          Password:
          <input
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
        <span>{addReceiverFields.passwordError}</span>
        <input type='submit' value='Submit' className='w-16' />
      </form>
    </div>
  )
}
export default AddReceiver
