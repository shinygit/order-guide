import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ChangeOrderAmount from './ChangeOrderAmount'
import deleteImage from '../assets/images/15107-illustration-of-a-red-close-button-pv.png'
import SaveIcon from '@material-ui/icons/Save'
import api from '../api/items'
import { EDIT_ITEM } from '../Queries/item'
import { useMutation } from '@apollo/react-hooks'

const EditItemForm = ({
  item,
  dispatchItems,
  suppliers,
  locations,
  handleDelete,
  handleEdit
}) => {
  const [edit, { loading, error }] = useMutation(EDIT_ITEM)
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    itemName: item.itemName,
    buildTo: item.buildTo,
    supplier: item.supplier,
    location: item.location,
    order: item.order,
    showEditForm: item.showEditForm
  })
  const handleChangeInput = event => {
    setEditItemForm({
      ...editItemForm,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = () => {
    edit({
      variables: {
        id: editItemForm.id,
        input: {
          itemName: editItemForm.itemName,
          buildTo: parseInt(editItemForm.buildTo),
          supplier: editItemForm.supplier,
          location: editItemForm.location
        }
      }
    })
  }

  useEffect(
    () =>
      setEditItemForm({
        id: item.id,
        itemName: item.itemName,
        buildTo: item.buildTo,
        supplier: item.supplier,
        location: item.location,
        order: item.order,
        showEditForm: false
      }),
    [item]
  )

  return (
    <tr>
      <Td>
        <SaveIcon
          onClick={() => {
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
          type='number'
          name='buildTo'
          value={editItemForm.buildTo}
          onChange={handleChangeInput}
        />
      </Td>
      <Td>{item.previousOrders[1]}</Td>
      <Td>{item.previousOrders[0]}</Td>
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
        <Input
          type='text'
          name='location'
          list='locationsList'
          value={editItemForm.location}
          onChange={handleChangeInput}
        />
        <datalist id='locationsList'>
          {locations.map(item => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </Td>
      <Td>
        <ButtonDelete
          type='button'
          onClick={() => handleDelete(editItemForm)}
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
