import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_SUPPLIERS } from '../../Queries/supplier'
import SupplierButton from './SupplierButton'
import gql from 'graphql-tag'

const SupplierFilterButtons = ({
  orderId,
  handleShowSupplier,
  activeFilterbuttonClass,
}) => {
  const { loading: supplierLoading, data: supplierData = {} } = useQuery(
    GET_SUPPLIERS
  )
  const { suppliers = [] } = supplierData

  if (supplierLoading) return null
  return suppliers.map((supplier) => {
    if (supplier.supplierName !== 'Market Price') {
      return (
        <SupplierButton
          key={supplier.supplierName}
          orderId={orderId}
          supplier={supplier}
          handleShowSupplier={handleShowSupplier}
          activeFilterbuttonClass={activeFilterbuttonClass}
        />
      )
    }
  })
}
export default SupplierFilterButtons
