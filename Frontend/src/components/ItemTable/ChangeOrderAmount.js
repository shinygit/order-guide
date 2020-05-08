import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { UPDATE_ITEM_ORDER_AMOUNT } from '../../Queries/item'
import { ORDER_DATES } from '../../Queries/order'

const ChangeOrderAmount = ({ id, orderAmount }) => {
  const { loading, error, data } = useQuery(ORDER_DATES, {
    variables: {
      orderDepth: 1,
    },
  })
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
  console.log(!data?.orders[0].isLocked)
  return (
    <div className='flex justify-around'>
      {!data?.orders[0].isLocked && (
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

      <span className=''>{orderAmount}</span>
      {!data?.orders[0].isLocked && (
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
export default ChangeOrderAmount
