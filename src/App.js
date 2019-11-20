import React, { useState, useEffect, useCallback } from 'react'

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

  return (
    <div>
      <ul>
        {items.map(item => (
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
