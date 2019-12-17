import React, { useEffect, useState } from 'react'
import api from '../api'

const OrderMenu = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [orderDates, setOrderDates] = useState([])
  useEffect(() => {
    async function getOrderDates () {
      setIsLoading(true)
      await api.getOrderDates().then(dates => {
        setOrderDates(dates.data)
        setIsLoading(false)
      })
    }
    getOrderDates()
  }, [])

  return orderDates.map(date => <h1>{date}</h1>)
}

export default OrderMenu
