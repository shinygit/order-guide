import React from 'react'
import styled from 'styled-components'
import ChangeOrderAmount from './ChangeOrderAmount'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone'

const areEqual = (prevProps, nextProps) => {
  return prevProps.item === nextProps.item
}
const TableItemRow = React.memo(({ dispatchItems, item, handleEdit }) => {
  return (
    <tr>
      <TdEdit>
        <CreateTwoToneIcon onClick={() => handleEdit(item._id)}>
          Edit
        </CreateTwoToneIcon>
      </TdEdit>
      <Td>{item.itemName}</Td>
      <MinTd>{item.buildTo}</MinTd>
      <MinTd>{item.previousOrders.twoWeeksAgo}</MinTd>
      <MinTd>{item.previousOrders.lastWeek}</MinTd>
      <MinTd>
        <ChangeOrderAmount
          _id={item._id}
          orderAmount={item.order}
          dispatchItems={dispatchItems}
        />
      </MinTd>
      <Td>{item.supplier}</Td>
      <Td>{item.location}</Td>
    </tr>
  )
}, areEqual)
const Td = styled.td`
  border: 1px solid grey;
  padding: 4px;
  text-align: center;
`
const MinTd = styled(Td)`
  width: 1px;
`
const TdEdit = styled(Td)`
width 25px`

export default TableItemRow
