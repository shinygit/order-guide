import React, { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'

import ListItems from './components/ListItems'
import AddItemForm from './components/AddItemForm'

import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'
import OrderMenu from './components/OrderMenu'
import NavBar from './components/NavBar/NavBar'

import Button from '@material-ui/core/Button'

import { GET_LATEST_ORDER } from './Queries/item'

const App = () => {
  const { loading, data, refetch, error } = useQuery(GET_LATEST_ORDER, {
    variables: { orderDepth: 1 }
  })
  const [items, setItems] = useState([])
  const [currentDate, setCurrentDate] = useState()
  useEffect(() => {
    if (data) {
      setCurrentDate(data.orders[0].orderDate)
      setItems(data.orders[0].items)
    }
  }, [data])
  useEffect(() => {
    refetch()
  }, [currentDate, refetch])

  const getCurrentSuppliers = useCallback(() => {
    const currentSuppliers = [...new Set(items.map(item => item.supplier))]
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

  return (
    <>
      <NavBar />
      <div>
        <OrderMenu setCurrentDate={setCurrentDate} currentDate={currentDate} />
        <SearchForm />
        <Button onClick={() => toggleNewItem()}>New Item</Button>
        <br />
        <FilterMenu suppliers={suppliers} locations={locations} />
        {newItemToggle && (
          <AddItemForm suppliers={suppliers} locations={locations} />
        )}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <ListItems
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
