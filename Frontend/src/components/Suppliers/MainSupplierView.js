import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import SupplierCard from './SupplierCard'
import SupplierEdit from './SupplierEdit'
import NewSupplierForm from './NewSupplierForm'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_SUPPLIERS = gql`
  query Suppliers {
    suppliers {
      id
      supplierName
      deliveryDay
      salesPersonName
      salesPersonPhoneNumber
      officePhoneNumber
    }
  }
`

const MainSupplierView = () => {
  const { loading, data } = useQuery(GET_SUPPLIERS)
  const [selectedCard, setSelectedCard] = useState('')

  if (loading) return <span>LOADING...</span>
  return (
    <div className='flex-col bg-blue-100 p-3'>
      <NavBar />
      <div className='flex'>
        <div className='flex-col flex-grow justify-between'>
          <NewSupplierForm />
          {data.suppliers.map((supplier) => {
            return (
              <SupplierCard
                key={supplier.id}
                supplier={supplier}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
              />
            )
          })}
        </div>
        {selectedCard ? (
          <SupplierEdit
            suppliers={data.suppliers}
            selectedCard={selectedCard}
          />
        ) : null}
      </div>
    </div>
  )
}
export default MainSupplierView
