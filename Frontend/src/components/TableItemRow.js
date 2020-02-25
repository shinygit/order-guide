import React from 'react'
import styled from 'styled-components'
import ChangeOrderAmount from './ChangeOrderAmount'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone'

const areEqual = (prevProps, nextProps) => {
  return prevProps.item === nextProps.item
}
const TableItemRow = React.memo(({ item, handleEdit }) => {
  return (
    <Tr>
      <TdEdit>
        <CreateTwoToneIcon onClick={() => handleEdit(item.id)}>
          Edit
        </CreateTwoToneIcon>
      </TdEdit>
      <Td>{item.itemName}</Td>
      <MinTd>{item.buildTo}</MinTd>
      <MinTd>{item.previousOrders[1]}</MinTd>
      <MinTd>{item.previousOrders[0]}</MinTd>
      <MinTd>
        <ChangeOrderAmount id={item.id} orderAmount={item.orderAmount} />
      </MinTd>
      <Td>{item.supplier}</Td>
      <Td>{item.location}</Td>
    </Tr>
  )
}, areEqual)
const Tr = styled.tr`
  border: 1px solid grey;
`
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
