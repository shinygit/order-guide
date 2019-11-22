import React, { useState, useEffect, useCallback, useReducer } from 'react'

import './App.css'
import initialItems from './testData/initialItems'
import AddItemForm from './components/AddItemForm'

const App = () => {
  const [items, setItems] = useState(initialItems)

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

  const filterReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_ALL':
        return 'ALL'
      case 'supplierFilter':
        return action.supplier
      default:
        throw new Error()
    }
  }

  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')

  const handleShowSupplier = (supplier) => {
    dispatchFilter({ type: 'supplierFilter', supplier: supplier })
  }
  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' })
  }
  const filteredItems = items.filter(item => {
    if (filter === 'ALL') {
      return true
    }
    if (item.supplier === filter.supplier) {
      return true
    }
    return false
  })

  return (
    <div>
      <button key='ALL' onClick={() => handleShowAll()}>ALL</button>
      {suppliers.map(supplier => (
        <button key={supplier} onClick={() => handleShowSupplier({ supplier })}>{supplier}</button>
      ))}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            <label>{item.itemName}</label>
          </li>
        ))}
      </ul>
      <AddItemForm items={items} setItems={setItems} suppliers={suppliers} />
    </div>
  )
}
export default App
