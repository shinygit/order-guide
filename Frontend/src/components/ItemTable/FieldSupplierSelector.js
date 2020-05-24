import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_SUPPLIERS } from '../../Queries/supplier'

const FieldSupplierSelector = ({
  handleChangeInput,
  currentSupplierSelection,
}) => {
  const {
    loading: loadingSuppliersData,
    data: allSuppliersData = { suppliers: [] },
  } = useQuery(GET_SUPPLIERS)

  const listOfSuppliers = allSuppliersData.suppliers.map((a) => a.supplierName)

  if (!loadingSuppliersData)
    return (
      <select
        name='supplier'
        value={currentSupplierSelection}
        onChange={handleChangeInput}
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
export default FieldSupplierSelector
