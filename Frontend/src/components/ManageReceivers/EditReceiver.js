import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_RECEIVERS } from '../../Queries/receiver'

const UPDATE_RECEIVER = gql`
  mutation updateReceiver(
    $id: ID!
    $receiverName: String!
    $login: String!
    $password: String!
  ) {
    updateReceiver(
      id: $id
      receiverName: $receiverName
      login: $login
      password: $password
    ) {
      ... on Receiver {
        id
        receiverName
        login
      }
      ... on UpdateReceiverError {
        loginError
        passwordError
        updateError
        receiverNameError
      }
    }
  }
`
const DELETE_RECEIVER = gql`
  mutation deleteReceiver($id: ID!) {
    deleteReceiver(id: $id)
  }
`

const EditReceiver = ({
  receiver,
  activeEditReceiver,
  setActiveEditReceiver,
}) => {
  const [updateReceiver] = useMutation(UPDATE_RECEIVER)
  const [deleteReceiver] = useMutation(DELETE_RECEIVER, {
    update(cache, { data: { deleteReceiver } }) {
      if (deleteReceiver === true) {
        const { receivers } = cache.readQuery({
          query: GET_RECEIVERS,
        })
        cache.writeQuery({
          query: GET_RECEIVERS,
          data: {
            receivers: receivers.filter(
              (receiverCache) => receiverCache.id !== receiver.id
            ),
          },
        })
      }
    },
  })

  const [errors, setErrors] = useState({
    receiverNameError: '',
    loginError: '',
    passwordError: '',
  })
  const [updateFields, setUpdateFields] = useState({
    receiverName: '',
    login: '',
    password: '',
  })
  const handleClick = () => {
    setActiveEditReceiver(receiver.id)
    setUpdateFields({
      receiverName: '',
      login: '',
      password: '',
    })
  }
  const cancel = () => {
    setUpdateFields({
      receiverName: '',
      login: '',
      password: '',
    })
    setErrors({
      receiverNameError: '',
      loginError: '',
      passwordError: '',
    })
    setActiveEditReceiver('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await updateReceiver({
      variables: {
        id: receiver.id,
        receiverName: updateFields.receiverName,
        login: updateFields.login,
        password: updateFields.password,
      },
    })
    if (result.data.updateReceiver.__typename === 'Receiver') {
      setActiveEditReceiver('')
    }
    if (result.data.updateReceiver.__typename === 'UpdateReceiverError') {
      setErrors({
        ...result.data.updateReceiver,
      })
    }
  }

  const handleChangeInput = (event) => {
    setUpdateFields({
      ...updateFields,
      [event.target.name]: event.target.value,
    })
  }

  const handleDeleteClick = async () => {
    if (
      window.confirm(
        `Do you really want to delete ${receiver.receiverName} as a receiver?`
      )
    ) {
      await deleteReceiver({
        variables: { id: receiver.id },
      })
      setActiveEditReceiver('')
    }
  }

  return (
    <>
      <button onClick={handleClick}>Edit</button>
      {activeEditReceiver === receiver.id ? (
        <div className='absolute border p-3 bg-gray-400 shadow-2xl flex flex-col'>
          <span>{receiver.receiverName}</span>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label>
              Receiver Name:
              <input
                className='m-2'
                type='text'
                name='receiverName'
                value={updateFields.receiverName}
                onChange={handleChangeInput}
                onFocus={() =>
                  setErrors({
                    receiverNameError: '',
                  })
                }
              />
            </label>
            <span>{errors.receiverNameError}</span>
            <label>
              Login:
              <input
                className='m-2'
                type='text'
                name='login'
                value={updateFields.login}
                onChange={handleChangeInput}
                onFocus={() =>
                  setErrors({
                    loginError: '',
                  })
                }
              />
            </label>
            <span>{errors.loginError}</span>
            <label>
              Password:
              <input
                className='m-2'
                type='text'
                name='password'
                value={updateFields.password}
                onChange={handleChangeInput}
                onFocus={() =>
                  setErrors({
                    passwordError: '',
                  })
                }
              />
            </label>
            <span>{errors.passwordError}</span>
            <span className='text-xs text-gray-700'>
              Leave blank if not changing.
            </span>
            <div className='flex justify-between mt-4'>
              <button
                type='button'
                className='border border-gray-700 bg-gray-200 text-gray-800 p-2 rounded'
                onClick={cancel}
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handleDeleteClick}
                className='border border-red-600 text-red-800 bg-red-200 p-1 rounded'
              >
                Delete
              </button>
              <input
                className='border border-green-600 text-green-800 bg-green-100 p-2 rounded'
                type='submit'
                value='Submit'
              />
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}

export default EditReceiver
