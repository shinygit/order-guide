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
    <div className='flex flex-col bg-blue-100 p-3'>
      <NavBar />

      <div className='flex'>
        <div className='w-8/12 flex flex-row flex-wrap'>
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
        <div className='flex flex-col'>
          <NewSupplierForm />
          {selectedCard ? (
            <SupplierEdit
              suppliers={data.suppliers}
              selectedCard={selectedCard}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default MainSupplierView
