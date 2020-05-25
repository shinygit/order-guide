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
      <div className='inline-block relative'>
        <select
          className='appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow focus:outline-none focus:shadow-outline'
          name='supplierName'
          value={selectedSupplier}
          onChange={handleSupplierChange}
        >
          <option key='unset' value={null}></option>
          <option key='Market Price' value='Market Price'>
            Market Price
          </option>
          {listOfSuppliers.flatMap((supplierName) =>
            supplierName === 'Market Price' ? null : (
              <option key={supplierName} value={supplierName}>
                {supplierName}
              </option>
            )
          )}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg
            className='fill-current h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>
      </div>
    )
  return null
}
export default MarketPriceSupplierSelector
