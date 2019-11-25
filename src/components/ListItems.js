import React from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import EditItemForm from './EditItemForm'
const ListItems = ({ items, handleDelete, filter, dispatchItems, suppliers, locations, searchTerm }) => {
  let filteredItems = items.filter(item => {
    if (filter === 'ALL') {
      return true
    }
    if (Array.isArray(filter) && filter.includes(item)) {
      return true
    }
    if (item.supplier === filter.supplier) {
      return true
    }
    if (item.location === filter.location) {
      return true
    }
    return false
  })
  if (Array.isArray(filter)) {
    filteredItems = filteredItems.sort((a, b) => {
      return filter.indexOf(a) - filter.indexOf(b)
    })
  }
  const handleEdit = (id) => {
    dispatchItems({ type: 'TOGGLE_EDIT', id: id })
  }
  return (
    <div>
      <table>
        <tbody>
          <tr><th /><th>Item</th><th>Order</th></tr>
          {filteredItems.map(item => {
            if (item.showEditForm) {
              return <EditItemForm
                key={item.id}
                item={item}
                dispatchItems={dispatchItems}
                suppliers={suppliers}
                locations={locations}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            } else { return <tr key={item.id}><td onClick={() => handleEdit(item.id)}>Edit</td><td>{item.itemName}</td><td><ChangeOrderAmount id={item.id} orderAmount={item.order} dispatchItems={dispatchItems} /></td></tr> }
          })}
        </tbody>
      </table>
    </div>

  )
}
export default ListItems
//          item.showEditForm && <EditItemForm filter={filter} item={item} dispatchItems={dispatchItems} suppliers={suppliers} locations={locations} handleDelete={handleDelete} />
