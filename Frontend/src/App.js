import React, { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'

import ListItems from './components/ItemTable/ListItems'
import AddItemForm from './components/AddItemForm'

import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'
import OrderMenu from './components/OrderMenu'
import NavBar from './components/NavBar/NavBar'

import { GET_LATEST_ORDER } from './Queries/item'
export const LocSupContext = React.createContext({
  locations: null,
  suppliers: null,
})
const App = () => {
  const { loading, data, refetch } = useQuery(GET_LATEST_ORDER, {
    variables: { orderDepth: 1 },
  })
  function idleTimer() {
    const idleTimeLength = 1000 * 60 * 10
    let idleTime = Date.now()
    let timer = false

    const triggerReload = () => {
      window.location.reload()
    }

    const callback = () => {}

    window.onload = resetTimer
    window.onmousemove = resetTimer
    window.onmousedown = resetTimer
    window.ontouchstart = resetTimer
    window.onclick = resetTimer
    window.onkeypress = resetTimer

    function resetTimer() {
      clearTimeout(timer)
      timer = setTimeout(callback, idleTimeLength)

      let currentTime = Date.now()
      if (currentTime - idleTime > idleTimeLength) triggerReload()
      idleTime = Date.now()
    }
  }
  idleTimer()
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
    <div className='flex-col p-3'>
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
      <LocSupContext.Provider
        value={{ locations: locations, suppliers: suppliers }}
      >
        {loading ? (
          <div className='flex'>
            <div className='text-6xl'>Loading</div>
            <div className='text-6xl animation-drip1'>.</div>
            <div className='text-6xl animation-drip2'>.</div>
            <div className='text-6xl animation-drip3'>.</div>
          </div>
        ) : (
          <ListItems items={items} />
        )}
      </LocSupContext.Provider>
    </div>
  )
}
export default App
