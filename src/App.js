import React, { useState, useEffect, useCallback, useReducer } from 'react'
import './App.css'
import initialItems from './testData/initialItems'
import ListItems from './components/ListItems'
import AddItemForm from './components/AddItemForm'
import EditItemForm from './components/EditItemForm'
import itemReducer from './reducers/itemReducer'
import filterReducer from './reducers/filterReducer'
import FilterMenu from './components/FilterMenu'

const App = () => {
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
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')
  return (
    <div>
      <FilterMenu filter={filter} dispatchFilter={dispatchFilter} suppliers={suppliers} />
      <ListItems handleEdit={handleEdit} items={items} filter={filter} dispatchItems={dispatchItems} />
      <AddItemForm items={items} dispatchItems={dispatchItems} suppliers={suppliers} />
      <EditItemForm items={items} dispatchItems={dispatchItems} suppliers={suppliers} editItemForm={editItemForm} setEditItemForm={setEditItemForm} handleDelete={handleDelete} />

    </div>
  )
}
export default App
