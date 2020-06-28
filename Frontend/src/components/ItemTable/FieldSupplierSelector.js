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
      <div className='inline-block relative'>
        <select
          className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow focus:outline-none focus:shadow-outline'
          name='supplier'
          value={currentSupplierSelection}
          onChange={handleChangeInput}
        >
          <option key='unset' value={null}></option>
          <option key='Market Price' value='Market Price'>
            Market Price
          </option>
          {listOfSuppliers.map((supplierName) =>
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
export default FieldSupplierSelector
