import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { EDIT_ITEM } from '../../Queries/item'
import { GET_SUPPLIERS } from '../../Queries/supplier'

const MarketPriceSupplierSelector = ({ item }) => {
  const {
    loading: loadingSuppliersData,
    data: allSuppliersData = { suppliers: [] },
  } = useQuery(GET_SUPPLIERS)

  const [selectedSupplier, setSelectedSupplier] = useState(item.supplier)

  const listOfSuppliers = allSuppliersData.suppliers.map((a) => a.supplierName)

  const [updateItem] = useMutation(EDIT_ITEM)

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value)
    if (e.target.value === '') {
      updateItem({
        variables: {
          id: item.id,
          input: { isMarketPrice: item.isMarketPrice, supplier: null },
        },
      })
    } else {
      updateItem({
        variables: {
          id: item.id,
          input: {
            isMarketPrice: item.isMarketPrice,
            supplier: e.target.value,
          },
        },
      })
    }
  }
  if (!loadingSuppliersData)
    return (
      <select
        name='supplierName'
        value={selectedSupplier}
        onChange={handleSupplierChange}
      >
        <option key='unset' value={null}></option>
        {listOfSuppliers.map((supplierName) => (
          <option key={supplierName} value={supplierName}>
            {supplierName}
          </option>
        ))}
      </select>
    )
  return null
}
export default MarketPriceSupplierSelector
