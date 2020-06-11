import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_SUPPLIERS_WITH_ORDER_STATUS } from '../../Queries/supplier'
import SupplierButton from './SupplierButton'

const SupplierFilterButtons = ({
  orderId,
  items,
  handleShowSupplier,
  activeFilterbuttonClass,
}) => {
  const { loading: supplierLoading, data: supplierData = {} } = useQuery(
    GET_SUPPLIERS_WITH_ORDER_STATUS,
    {
      variables: { orderId: orderId },
    }
  )
  const { suppliers = [] } = supplierData
  if (supplierLoading) return null
  return suppliers.map((supplier) => {
    if (supplier.supplierName !== 'Market Price') {
      return (
        <SupplierButton
          key={supplier.supplierName}
          supplier={supplier}
          items={items}
          handleShowSupplier={handleShowSupplier}
          activeFilterbuttonClass={activeFilterbuttonClass}
        />
      )
    }
    return null
  })
}
export default SupplierFilterButtons
