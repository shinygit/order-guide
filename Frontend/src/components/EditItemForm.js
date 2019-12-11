import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ChangeOrderAmount from './ChangeOrderAmount'
import deleteImage from '../assets/images/15107-illustration-of-a-red-close-button-pv.png'
import SaveIcon from '@material-ui/icons/Save'

const EditItemForm = ({
  item,
  dispatchItems,
  suppliers,
  locations,
  handleDelete,
  handleEdit
}) => {
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    itemName: item.itemName,
    buildTo: item.buildTo,
    supplier: item.supplier,
    location: item.location
  })
  const handleChangeInput = event => {
    setEditItemForm({
      ...editItemForm,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    if (editItemForm) {
      dispatchItems({
        type: 'EDIT_ITEM',
        id: editItemForm.id,
        itemName: editItemForm.itemName,
        buildTo: editItemForm.buildTo,
        supplier: editItemForm.supplier,
        location: editItemForm.location
      })
    }
  }

  useEffect(
    () =>
      setEditItemForm({
        id: item.id,
        itemName: item.itemName,
        buildTo: item.buildTo,
        supplier: item.supplier,
        location: item.location
      }),
    [item]
  )

  return (
    <tr>
      <Td>
        <SaveIcon
          onClick={() => {
            handleEdit(item.id)
            handleSubmit()
          }}
        >
          Edit
        </SaveIcon>
      </Td>
      <Td>
        <Input
          type='text'
          name='itemName'
          value={editItemForm.itemName}
          onChange={handleChangeInput}
        />
      </Td>
      <Td>
        <Input
          type='text'
          name='buildTo'
          value={editItemForm.buildTo}
          onChange={handleChangeInput}
        />
      </Td>
      <Td>
        <ChangeOrderAmount
          id={item.id}
          orderAmount={item.order}
          dispatchItems={dispatchItems}
        />
      </Td>
      <Td>
        <Input
          type='text'
          name='supplier'
          list='suppliersList'
          value={editItemForm.supplier}
          onChange={handleChangeInput}
        />
        <datalist id='suppliersList'>
          {suppliers.map(item => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </Td>
      <Td>
        <ButtonDelete
          type='button'
          onClick={() => handleDelete(editItemForm.id)}
        />
      </Td>
    </tr>
  )
}
export default EditItemForm
const Td = styled.td`
  border: 1px solid grey;
  padding: 4px;
  text-align: left;
`
const Input = styled.input`
  box-sizing: border-box;
`
const ButtonDelete = styled.button`
  background-image: url(${deleteImage});
  background-size: contain;
  border: 1px solid #000;
  width: 20px;
  height: 20px;
`
