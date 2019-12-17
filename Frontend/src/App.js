import React, { useState, useEffect, useCallback, useReducer } from 'react'
import './App.css'
// import { initialItems } from './testData/initialItems'
import api from './api'
import ListItems from './components/ListItems'
import AddItemForm from './components/AddItemForm'
import itemReducer from './reducers/itemReducer'
import filterReducer from './reducers/filterReducer'
import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'

import Button from '@material-ui/core/Button'
import OrderWeekSelector from './components/OrderMenu'

const App = () => {
  useEffect(() => {
    async function getInitialItems () {
      setIsLoading(true)
      await api.getAllItems().then(items => {
        dispatchItems({ type: 'LOAD_ITEMS', items: items.data.data })
        setIsLoading(false)
      })
    }

    getInitialItems()
  }, [])
  const [isLoading, setIsLoading] = useState(false)
  const [itemsCurrentlyFiltered, setItemsCurrentlyFiltered] = useState(false)
  const [items, dispatchItems] = useReducer(itemReducer, [])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentWeek, setcurrentWeek] = useState(new Date('2019-12-16'))
  const getCurrentSuppliers = useCallback(() => {
    const currentSuppliers = []
    items.forEach(item => {
      if (currentSuppliers.includes(item.supplier)) {
      } else {
        currentSuppliers.push(item.supplier)
      }
    })
    return currentSuppliers.sort()
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
    return currentLocations.sort()
  }, [items])

  const [locations, setLocations] = useState(getCurrentLocations)

  useEffect(() => {
    setLocations(getCurrentLocations())
  }, [getCurrentLocations])

  const handleDelete = editItemForm => {
    api.deleteItemById(editItemForm._id).then(res => {
      console.log(res)
      dispatchItems({ type: 'DELETE_ITEM', _id: editItemForm._id })
    })
  }
  const [newItemToggle, setNewItemToggle] = useState(false)
  const toggleNewItem = () => {
    setNewItemToggle(!newItemToggle)
  }
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')

  return (
    <div>
      <OrderWeekSelector />
      <SearchForm
        items={items}
        dispatchFilter={dispatchFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        itemsCurrentlyFiltered={itemsCurrentlyFiltered}
        setItemsCurrentlyFiltered={setItemsCurrentlyFiltered}
      />
      <SortMenu dispatchItems={dispatchItems} items={items} />
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
          currentWeek={currentWeek}
        />
      )}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ListItems
          filter={filter}
          searchTerm={searchTerm}
          items={items}
          dispatchItems={dispatchItems}
          suppliers={suppliers}
          locations={locations}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}
export default App
