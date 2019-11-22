import React, { useState, useEffect, useCallback, useReducer } from 'react'
import './App.css'
import initialItems from './testData/initialItems'
import ListItems from './components/ListItems'
import AddItemForm from './components/AddItemForm'
import itemReducer from './reducers/itemReducer'
import filterReducer from './reducers/filterReducer'
import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'

const App = () => {
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

  const getCurrentLocations = useCallback(() => {
    const currentLocations = []
    items.forEach(item => {
      if (currentLocations.includes(item.location)) {} else { currentLocations.push(item.location) }
    })
    return currentLocations
  }, [items])

  const [locations, setLocations] = useState(getCurrentLocations)

  useEffect(() => {
    setLocations(getCurrentLocations())
  }, [getCurrentLocations])

  const handleDelete = (id) => {
    dispatchItems({ type: 'DELETE_ITEM', id: id })
  }

  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')
  return (
    <div>
      <SearchForm items={items} />
      <FilterMenu filter={filter} dispatchFilter={dispatchFilter} suppliers={suppliers} locations={locations} />
      <ListItems filter={filter} items={items} dispatchItems={dispatchItems} suppliers={suppliers} locations={locations} handleDelete={handleDelete} />
      <AddItemForm items={items} dispatchItems={dispatchItems} suppliers={suppliers} locations={locations} />
    </div>
  )
}
export default App
