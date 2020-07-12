import React from 'react'

const TableDescription = ({ filterName, filterType, suppliers }) => {
  if (filterName === 'SHORTED' && filterType === 'SHORTED')
    return (
      <div className='flex flex-col text-lg bg-yellow-200 p-4 border-t border-l border-r border-gray-700'>
        Additional Notes:
        {suppliers.map((supplier) => {
          if (
            filterName === 'SHORTED' &&
            filterType === 'SHORTED' &&
            supplier.wasOrderReceived &&
            supplier.additionalNotes
          )
            return (
              <div className='m-1 ml-4'>
                <span>{`${supplier.supplierName}: `}</span>
                <span>{supplier.additionalNotes}</span>
              </div>
            )
        })}
      </div>
    )
  if (filterName === 'DOUBLECHECK' && filterType === 'DOUBLECHECK')
    return (
      <div className='flex flex-col text-lg bg-yellow-200 p-4 border-t border-l border-r border-gray-700'>
        Items not ordered this week but have been ordered at least 3 of the last
        4 weeks.
      </div>
    )

  return null
}
export default TableDescription
