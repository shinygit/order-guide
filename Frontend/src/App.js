import React, { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'

import ListItems from './components/ItemTable/ListItems'
import AddItemForm from './components/AddItemForm'

import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'
import OrderMenu from './components/OrderMenu'
import NavBar from './components/NavBar/NavBar'

import { GET_LATEST_ORDER } from './Queries/item'

const App = () => {
  const { loading, data, refetch } = useQuery(GET_LATEST_ORDER, {
    variables: { orderDepth: 1 },
  })

  const [items, setItems] = useState([])

  const [currentDate, setCurrentDate] = useState('')
  useEffect(() => {
    if (
      data &&
      data.orders[0] &&
      data.orders[0].orderDate &&
      data.orders[0].items
    ) {
      setCurrentDate(data.orders[0].orderDate)
      setItems(data.orders[0].items)
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [currentDate, refetch])

  const getCurrentSuppliers = useCallback(() => {
    const currentSuppliers = [...new Set(items.map((item) => item.supplier))]
    return currentSuppliers.sort()
  }, [items])

  const [suppliers, setSuppliers] = useState(getCurrentSuppliers)

  useEffect(() => {
    setSuppliers(getCurrentSuppliers())
  }, [getCurrentSuppliers])

  const getCurrentLocations = useCallback(() => {
    const currentLocations = []
    items.forEach((item) => {
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
    <div className='flex-col bg-blue-100 p-3'>
      <NavBar />
      <OrderMenu setCurrentDate={setCurrentDate} currentDate={currentDate} />
      {newItemToggle && (
        <AddItemForm
          suppliers={suppliers}
          locations={locations}
          toggleNewItem={toggleNewItem}
        />
      )}
      <FilterMenu
        items={items}
        suppliers={suppliers}
        locations={locations}
        toggleNewItem={toggleNewItem}
        newItemToggle={newItemToggle}
        orderId={data?.orders[0]?.id}
      />
      <SearchForm />
      {loading ? (
        <h1 className='text-6xl'>Loading...</h1>
      ) : (
        <ListItems items={items} suppliers={suppliers} locations={locations} />
      )}
    </div>
  )
}
export default App
