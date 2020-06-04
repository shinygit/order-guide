import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UPDATE_ITEM_RECEIVE_AMOUNT } from '../../../Queries/item'

import gql from 'graphql-tag'

const ChangeReceivedAmount = ({ item }) => {
  const { id, quantityReceived } = item

  const getNextAmount = (quantityReceived) => {
    if (quantityReceived === null) {
      return 0
    } else return quantityReceived - 1
  }
  const [updateItemReceiveAmount] = useMutation(UPDATE_ITEM_RECEIVE_AMOUNT)
  const handleDecrease = () => {
    updateItemReceiveAmount({
      variables: {
        id: id,
        quantityReceived: getNextAmount(quantityReceived),
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateItemReceiveAmount: {
          __typename: 'Item',
          id: id,
          quantityReceived: getNextAmount(quantityReceived),
        },
      },
    })
  }
  const handleIncrease = () => {
    updateItemReceiveAmount({
      variables: {
        id: id,
        quantityReceived: quantityReceived + 1,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateItemReceiveAmount: {
          __typename: 'Item',
          id: id,
          quantityReceived: quantityReceived + 1,
        },
      },
    })
  }
  return (
    <div className='flex justify-around'>
      <button
        className=''
        onClick={() => handleDecrease()}
        data-cy='decreaseReceiveAmount'
      >
        <svg
          className='h-6 w-6'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path d='M19 13H5v-2h14v2z' />
        </svg>
      </button>
      <span className=''>{quantityReceived}</span>
      <button
        className=''
        onClick={() => handleIncrease()}
        data-cy='increaseReceiveAmount'
      >
        <svg
          className='h-6 w-6'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
        </svg>
      </button>
    </div>
  )
}

export default ChangeReceivedAmount
