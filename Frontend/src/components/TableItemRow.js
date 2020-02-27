import React from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'

const areEqual = (prevProps, nextProps) => {
  return prevProps.item === nextProps.item
}
const TableItemRow = React.memo(({ item, handleEdit }) => {
  return (
    <tr>
      <td>
        <button onClick={() => handleEdit(item.id)} />
      </td>
      <td>{item.itemName}</td>
      <td>{item.buildTo}</td>
      <td>{item.previousOrders[1]}</td>
      <td>{item.previousOrders[0]}</td>
      <td>
        <ChangeOrderAmount id={item.id} orderAmount={item.orderAmount} />
      </td>
      <td>{item.supplier}</td>
      <td>{item.location}</td>
    </tr>
  )
}, areEqual)
export default TableItemRow
