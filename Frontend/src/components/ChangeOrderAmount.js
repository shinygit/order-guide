import React from 'react'
import api from '../api/'
const ChangeOrderAmount = ({ _id, orderAmount, dispatchItems }) => {
  const handleDecrease = () => {
    dispatchItems({ type: 'DECREASE_ORDER_AMOUNT', _id: _id })
  }
  const handleIncrease = () => {
    dispatchItems({ type: 'INCREASE_ORDER_AMOUNT', _id: _id })
  }
  React.useEffect(() => {
    api
      .updateItemById(_id, { order: orderAmount })
      .then(res => console.log(res.data.item.order))
  }, [_id, orderAmount])
  return (
    <>
      <button className={`${_id} decrease`} onClick={() => handleDecrease()}>
        -
      </button>
      {orderAmount}
      <button onClick={() => handleIncrease()}>+</button>
    </>
  )
}
export default ChangeOrderAmount
