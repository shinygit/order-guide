import React, { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'

import ListItems from './components/ItemTable/ListItems'
import AddItemForm from './components/AddItemForm'

import FilterMenu from './components/FilterMenu'
import SearchForm from './components/SearchForm'
import OrderMenu from './components/OrderMenu'
import NavBar from './components/NavBar/NavBar'
import Loading from './components/Loading'

import { GET_LATEST_ORDER } from './Queries/item'
export const LocSupContext = React.createContext({
  locations: null,
})
const App = () => {
  const { loading, data, refetch } = useQuery(GET_LATEST_ORDER, {
    variables: { orderDepth: 1 },
    notifyOnNetworkStatusChange: true,
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
  if (loading) return <Loading />
  return (
    <div>
      <NavBar />
      <div className='p-3'>
        <OrderMenu setCurrentDate={setCurrentDate} currentDate={currentDate} />
        <LocSupContext.Provider value={{ locations: locations }}>
          <FilterMenu
            items={items}
            locations={locations}
            orderId={data.orders[0].id}
          />
          <SearchForm />
          {loading ? <Loading /> : <ListItems items={items} />}
        </LocSupContext.Provider>
      </div>
    </div>
  )
}
export default App
