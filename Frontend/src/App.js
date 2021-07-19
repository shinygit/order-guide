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
import { GET_SUPPLIERS_WITH_ORDER_STATUS } from './Queries/supplier'
import { GET_CATEGORIES } from './Queries/category'
export const LocSupContext = React.createContext({
  locations: null,
})
const App = () => {
  const { loading, data, refetch } = useQuery(GET_LATEST_ORDER, {
    variables: { orderDepth: 1 },
    notifyOnNetworkStatusChange: true,
  })

  const { loading: supplierLoading, data: supplierData = {} } = useQuery(
    GET_SUPPLIERS_WITH_ORDER_STATUS,
    {
      variables: { orderId: data?.orders[0]?.id },
      skip: !data,
    }
  )

  const { loading: loadingCategoriesData, data: allCategoriesData } = useQuery(
    GET_CATEGORIES
  )

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

  const getCurrentLocations = useCallback(() => {
    const currentLocations = []
    items.forEach((item) => {
      if (currentLocations.includes(item.location)) {
      } else if (item.location !== null) {
        currentLocations.push(item.location)
      }
    })
    return currentLocations.sort()
  }, [items])

  const [locations, setLocations] = useState(getCurrentLocations)

  useEffect(() => {
    setLocations(getCurrentLocations())
  }, [getCurrentLocations])
  if (loading || supplierLoading || loadingCategoriesData) {
    return (
      <div>
        <NavBar />
        <Loading />
      </div>
    )
  }
  return (
    <div>
      <NavBar />
      <div className='p-2'>
        <OrderMenu
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
          refetch={refetch}
        />
        <LocSupContext.Provider value={{ locations: locations }}>
          <FilterMenu
            items={items}
            locations={locations}
            orderId={data.orders[0].id}
          />
          <SearchForm />
          {loading ? (
            <Loading />
          ) : (
            <ListItems items={items} orderId={data.orders[0].id} />
          )}
        </LocSupContext.Provider>
      </div>
    </div>
  )
}
export default App
