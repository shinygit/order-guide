import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UPDATE_ITEM_ORDER_AMOUNT } from '../../Queries/item'

import gql from 'graphql-tag'

const ITEM_ORDER_AMOUNT = gql`
  fragment item on Item {
    id
    orderAmount
  }
`

const ChangeOrderAmount = ({ id, orderDates }) => {
  const client = useApolloClient()
  const { orderAmount } = client.readFragment(
    {
      id: `Item:${id}`,
      fragment: ITEM_ORDER_AMOUNT,
    },
    true
  )
  const getNextOrderAmount = (orderAmount) => {
    if (orderAmount === null) {
      return 0
    } else return orderAmount + 1
  }
  const [updateItemOrderAmount] = useMutation(UPDATE_ITEM_ORDER_AMOUNT)
  const handleDecrease = () => {
    updateItemOrderAmount({
      variables: {
        id: id,
        orderAmount: orderAmount - 1,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateItemOrderAmount: {
          __typename: 'Item',
          id: id,
          orderAmount: orderAmount - 1,
        },
      },
    })
  }
  const handleIncrease = () => {
    updateItemOrderAmount({
      variables: {
        id: id,
        orderAmount: getNextOrderAmount(orderAmount),
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateItemOrderAmount: {
          __typename: 'Item',
          id: id,
          orderAmount: getNextOrderAmount(orderAmount),
        },
      },
    })
  }
  return (
    <div className='flex justify-around'>
      {!orderDates?.orders[0].isLocked && (
        <button className='' onClick={() => handleDecrease()}>
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M19 13H5v-2h14v2z' />
          </svg>
        </button>
      )}
      {orderDates?.orders[0].isLocked ? (
        <span className='font-bold text-2xl'>{orderAmount}</span>
      ) : (
        <span className=''>{orderAmount}</span>
      )}
      {!orderDates?.orders[0].isLocked && (
        <button className='' onClick={() => handleIncrease()}>
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
          </svg>
        </button>
      )}
    </div>
  )
}
export default React.memo(ChangeOrderAmount)
