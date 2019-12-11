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
        <CreateTwoToneIcon onClick={() => handleEdit(item.id)}>
          Edit
        </CreateTwoToneIcon>
      </TdEdit>
      <Td>{item.itemName}</Td>
      <Td>{item.buildTo}</Td>
      <Td>
        <ChangeOrderAmount
          id={item.id}
          orderAmount={item.order}
          dispatchItems={dispatchItems}
        />
      </Td>
      <Td>{item.supplier}</Td>
    </tr>
  )
}, areEqual)
const Td = styled.td`
  border: 1px solid grey;
  padding: 4px;
  text-align: left;
`
const TdEdit = styled(Td)`
width 25px`

export default TableItemRow
