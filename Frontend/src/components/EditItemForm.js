import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ChangeOrderAmount from './ChangeOrderAmount'
import deleteImage from '../assets/images/15107-illustration-of-a-red-close-button-pv.png'
import SaveIcon from '@material-ui/icons/Save'
import api from '../api/'

const EditItemForm = ({
  item,
  dispatchItems,
  suppliers,
  locations,
  handleDelete,
  handleEdit
}) => {
  const [editItemForm, setEditItemForm] = useState({
    _id: item._id,
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

  const handleSubmit = event => {
    if (editItemForm) {
      api.updateItemById(editItemForm._id, editItemForm).then(res => {
        console.log(res)
        handleEdit(item._id)
        dispatchItems({
          type: 'EDIT_ITEM',
          _id: res.data.item._id,
          itemName: res.data.item.itemName,
          buildTo: res.data.item.buildTo,
          supplier: res.data.item.supplier,
          location: res.data.item.location,
          order: res.data.item.order,
          showEditForm: res.data.item.showEditForm
        })
      })
    }
  }

  useEffect(
    () =>
      setEditItemForm({
        _id: item._id,
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
          type='text'
          name='buildTo'
          value={editItemForm.buildTo}
          onChange={handleChangeInput}
        />
      </Td>
      <Td>
        <ChangeOrderAmount
          _id={item._id}
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
