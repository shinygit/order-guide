import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { useQuery } from '@apollo/react-hooks'
import './App.css'
// import { initialItems } from './testData/initialItems'

import ListItems from './components/ListItems'
import AddItemForm from './components/AddItemForm'

import filterReducer from './reducers/filterReducer'
import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'
import SortMenu from './components/SortMenu'
import OrderMenu from './components/OrderMenu'
import NavBar from './components/NavBar/NavBar'
import { client } from './index'

import Button from '@material-ui/core/Button'

import { GET_LATEST_ORDER } from './Queries/item'

const company = 'testCompany'

const App = () => {
  const { loading, data, refetch } = useQuery(GET_LATEST_ORDER, {
    variables: { orderDepth: 1 }
  })
  const [items, setItems] = useState([])
  const [currentDate, setCurrentDate] = useState()
  console.log(
    client.readQuery({
      query: GET_LATEST_ORDER,
      variables: { orderDepth: 1 }
    })
  )
  useEffect(() => {
    if (loading) setIsLoading(true)
    if (data) {
      setCurrentDate(data.orders[0].orderDate)
      setItems(data.orders[0].items)
      setIsLoading(false)
      console.log(
        client.readQuery({
          query: GET_LATEST_ORDER,
          variables: { orderDepth: 1 }
        })
      )
    }
  }, [loading, data])
  useEffect(() => {
    refetch()
  }, [currentDate, refetch])

  const [isLoading, setIsLoading] = useState(false)
  const [itemsCurrentlyFiltered, setItemsCurrentlyFiltered] = useState(false)

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
        <SortMenu items={items} />
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
            suppliers={suppliers}
            locations={locations}
          />
        )}
      </div>
    </>
  )
}
export default App
