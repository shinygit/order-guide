import React from 'react'
import { FILTER_QUERY } from '../../Queries/filter'
import { useQuery, useApolloClient } from '@apollo/react-hooks'

const OrderModeToggle = () => {
  const client = useApolloClient()
  const { data } = useQuery(FILTER_QUERY)
  const {
    filter: { hideAllZeroOrderAmount },
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

  return (
    <div
      className='text-6xl mx-5 -my-5'
      style={{ userSelect: 'none' }}
      onClick={handleToggleOrderAmount}
    >
      {hideAllZeroOrderAmount ? 'Ø' : 'O'}
    </div>
  )
}
export default OrderModeToggle
