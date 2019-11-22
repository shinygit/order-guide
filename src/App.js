import React, { useState, useEffect, useCallback, useReducer } from 'react'
import './App.css'
import initialItems from './testData/initialItems'
import ListItems from './components/ListItems'
import AddItemForm from './components/AddItemForm'
import EditItemForm from './components/EditItemForm'
import itemReducer from './reducers/itemReducer'
import filterReducer from './reducers/filterReducer'

const App = () => {
  const [itemForm, setItemForm] = useState({
    itemName: '',
    supplier: ''
  })
  const [editItemForm, setEditItemForm] = useState({
    itemName: '',
    supplier: ''

  })

  const [items, dispatchItems] = useReducer(itemReducer, initialItems)

  const getCurrentSuppliers = useCallback(() => {
    const currentSuppliers = []
    items.forEach(item => {
      if (currentSuppliers.includes(item.supplier)) {} else { currentSuppliers.push(item.supplier) }
    })
    return currentSuppliers
  }, [items])

  const [suppliers, setSuppliers] = useState(getCurrentSuppliers)

  useEffect(() => {
    setSuppliers(getCurrentSuppliers())
  }, [getCurrentSuppliers])

  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')

  const handleShowSupplier = (supplier) => {
    dispatchFilter({ type: 'supplierFilter', supplier: supplier })
  }
  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' })
  }
  const handleDelete = (id) => {
    dispatchItems({ type: 'DELETE_ITEM', id: id })
  }
  const handleEdit = (id) => {
    items.forEach(item => {
      if (item.id === id) {
        setEditItemForm(item)
      }
    })
  }

  return (
    <div>
      <button key='ALL' onClick={() => handleShowAll()}>ALL</button>
      {suppliers.map(supplier => (
        <button key={supplier} onClick={() => handleShowSupplier({ supplier })}>{supplier}</button>
      ))}
      <ListItems handleEdit={handleEdit} items={items} filter={filter} />
      <AddItemForm items={items} dispatchItems={dispatchItems} suppliers={suppliers} itemForm={itemForm} setItemForm={setItemForm} />
      <EditItemForm items={items} dispatchItems={dispatchItems} suppliers={suppliers} editItemForm={editItemForm} setEditItemForm={setEditItemForm} handleDelete={handleDelete} />

    </div>
  )
}
export default App
