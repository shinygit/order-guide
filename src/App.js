import React, { useState, useEffect, useCallback, useReducer } from 'react'
import './App.css'
import { initialItems } from './testData/initialItems'
import ListItems from './components/ListItems'
import AddItemForm from './components/AddItemForm'
import itemReducer from './reducers/itemReducer'
import filterReducer from './reducers/filterReducer'
import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'
import sortReducer from './reducers/sortReducer'

import Button from '@material-ui/core/Button'

const App = () => {
  const [itemsCurrentlySorted, setItemsCurrentlySorted] = useState(false)
  const [itemsCurrentlyFiltered, setItemsCurrentlyFiltered] = useState(false)
  const [items, dispatchItems] = useReducer(itemReducer, initialItems)
  const [searchTerm, setSearchTerm] = useState('')
  const getCurrentSuppliers = useCallback(() => {
    const currentSuppliers = []
    items.forEach(item => {
      if (currentSuppliers.includes(item.supplier)) {
      } else {
        currentSuppliers.push(item.supplier)
      }
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
      if (currentLocations.includes(item.location)) {
      } else {
        currentLocations.push(item.location)
      }
    })
    return currentLocations
  }, [items])

  const [locations, setLocations] = useState(getCurrentLocations)

  useEffect(() => {
    setLocations(getCurrentLocations())
  }, [getCurrentLocations])

  const handleDelete = id => {
    dispatchItems({ type: 'DELETE_ITEM', id: id })
  }
  const [newItemToggle, setNewItemToggle] = useState(false)
  const toggleNewItem = () => {
    setNewItemToggle(!newItemToggle)
  }
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')
  const [sort, dispatchSort] = useReducer(sortReducer, false)
  return (
    <div>
      <SearchForm
        items={items}
        dispatchFilter={dispatchFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        itemsCurrentlyFiltered={itemsCurrentlyFiltered}
        setItemsCurrentlyFiltered={setItemsCurrentlyFiltered}
      />
      <SortMenu
        setItemsCurrentlySorted={setItemsCurrentlySorted}
        dispatchSort={dispatchSort}
        items={items}
      />
      <Button onClick={() => toggleNewItem()}>New Item</Button>
      <br />
      <FilterMenu
        filter={filter}
        dispatchFilter={dispatchFilter}
        suppliers={suppliers}
        locations={locations}
        itemsCurrentlyFiltered={itemsCurrentlyFiltered}
        setItemsCurrentlyFiltered={setItemsCurrentlyFiltered}
      />
      {newItemToggle && (
        <AddItemForm
          items={items}
          dispatchItems={dispatchItems}
          suppliers={suppliers}
          locations={locations}
        />
      )}
      <ListItems
        filter={filter}
        sort={sort}
        searchTerm={searchTerm}
        items={items}
        dispatchItems={dispatchItems}
        suppliers={suppliers}
        locations={locations}
        handleDelete={handleDelete}
        itemsCurrentlySorted={itemsCurrentlySorted}
      />
    </div>
  )
}
export default App
