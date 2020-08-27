import React from 'react'
import { FILTER_QUERY } from '../../Queries/filter'
import { useQuery, useApolloClient } from '@apollo/react-hooks'

const OrderModeToggle = () => {
  const client = useApolloClient()
  const { data } = useQuery(FILTER_QUERY)
  const {
    filter: { hideAllZeroOrderAmount, hideInfrequent },
  } = data
  const handleToggleOrderAmount = () => {
    client.writeQuery({
      query: FILTER_QUERY,
      data: {
        filter: {
          ...data.filter,
          hideAllZeroOrderAmount: !hideAllZeroOrderAmount,
        },
      },
    })
  }
  const handleToggleHideInfrequent = () => {
    client.writeQuery({
      query: FILTER_QUERY,
      data: {
        filter: {
          ...data.filter,
          hideInfrequent: !hideInfrequent,
        },
      },
    })
  }

  return (
    <>
      <div
        className='mx-5 -my-5 text-6xl'
        style={{ userSelect: 'none' }}
        onClick={handleToggleOrderAmount}
      >
        {hideAllZeroOrderAmount ? 'Ø' : 'O'}
      </div>
      <button onClick={handleToggleHideInfrequent} className='px-1 mx-2'>
        {hideInfrequent ? (
          <span>
            Infrequent
            <br />
            Hidden
          </span>
        ) : (
          <span>
            Infrequent
            <br />
            Shown
          </span>
        )}
      </button>
    </>
  )
}
export default OrderModeToggle
