import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const TOGGLE_FLAGGED_BY_RECEIVER = gql`
  mutation toggleFlaggedByReceiver($id: ID!, $flaggedByReceiver: String) {
    toggleFlaggedByReceiver(id: $id, flaggedByReceiver: $flaggedByReceiver) {
      id
      itemName
      orderAmount
      supplier
      quantityReceived
      receivingNote
      flaggedByReceiver
      receiverNote
    }
  }
`

const ReceiverFlaggedToggle = ({ item, me }) => {
  const [toggleFlaggedByReceiver, { data, loading, error }] = useMutation(
    TOGGLE_FLAGGED_BY_RECEIVER
  )
  const handleToggleFlaggedByReceiver = () => {
    toggleFlaggedByReceiver({
      variables: {
        id: item.id,
        flaggedByReceiver: item.flaggedByReceiver
          ? null
          : me.receiverName
          ? me.receiverName
          : 'You',
      },
    })
  }
  return item.flaggedByReceiver ? (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      className='fill-current text-red-500 m-auto'
      onClick={handleToggleFlaggedByReceiver}
    >
      <path d='M19.64 16.36L11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z' />
    </svg>
  ) : (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      className='fill-current text-gray-400 m-auto'
      onClick={handleToggleFlaggedByReceiver}
    >
      <path d='M19.64 16.36L11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z' />
    </svg>
  )
}

export default ReceiverFlaggedToggle
