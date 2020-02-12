import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { useQuery } from '@apollo/react-hooks'
import './App.css'
// import { initialItems } from './testData/initialItems'
import api from './api/items'
import ListItems from './components/ListItems'
import AddItemForm from './components/AddItemForm'
import itemReducer from './reducers/itemReducer'
import filterReducer from './reducers/filterReducer'
import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'
import OrderMenu from './components/OrderMenu'
import NavBar from './components/NavBar/NavBar'

import Button from '@material-ui/core/Button'

import { GET_LATEST_ORDER } from './Queries/item'

const company = 'testCompany'

const App = () => {
  /*   const [user, dispatchUser] = useReducer(userReducer, {
    isAuthenticated: false,
    id: null,
    name: null,
    token: null
  })
  useEffect(() => {
    if (localStorage.token) {
      dispatchUser({ type: 'RESUME', payload: localStorage.token })
    }
  }, []) */

  const { loading, data, refetch } = useQuery(GET_LATEST_ORDER, {
    variables: { orderDepth: 1 }
  })
  const [currentDate, setCurrentDate] = useState('')
  useEffect(() => {
    if (loading) setIsLoading(true)
    if (data) {
      setCurrentDate(data.orders[0].orderDate)
      dispatchItems({ type: 'LOAD_ITEMS', items: data.orders[0].items })
      setIsLoading(false)
    }
  }, [loading, data])
  useEffect(() => {
    refetch()
  }, [currentDate, refetch])

  const [isLoading, setIsLoading] = useState(false)
  const [itemsCurrentlyFiltered, setItemsCurrentlyFiltered] = useState(false)

  const [items, dispatchItems] = useReducer(itemReducer, [])
  const [searchTerm, setSearchTerm] = useState('')
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
    api.deleteItemById(editItemForm.id).then(res => {
      dispatchItems({ type: 'DELETE_ITEM', id: editItemForm.id })
    })
  }
  const [newItemToggle, setNewItemToggle] = useState(false)
  const toggleNewItem = () => {
    setNewItemToggle(!newItemToggle)
  }
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')

  return (
    <>
      <NavBar />
      <div>
        <OrderMenu setCurrentDate={setCurrentDate} currentDate={currentDate} />
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
            company={company}
            currentDate={currentDate}
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
    </>
  )
}
export default App
