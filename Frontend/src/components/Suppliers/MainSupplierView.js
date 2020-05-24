import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import SupplierCard from './SupplierCard'
import SupplierEdit from './SupplierEdit'
import NewSupplierForm from './NewSupplierForm'
import { useQuery } from '@apollo/react-hooks'
import { GET_SUPPLIERS } from '../../Queries/supplier'

const MainSupplierView = () => {
  const { loading, data } = useQuery(GET_SUPPLIERS)
  const [selectedCard, setSelectedCard] = useState('')
  if (loading) return <span>LOADING...</span>
  return (
    <div className='flex flex-col p-3'>
      <NavBar />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5'>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:col-span-2 gap-3'>
          {data.suppliers.map((supplier) => {
            if (supplier.supplierName === 'Market Price') return null
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
        <div className='flex flex-col'>
          <NewSupplierForm />
          {selectedCard ? (
            <SupplierEdit
              suppliers={data.suppliers}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default MainSupplierView
