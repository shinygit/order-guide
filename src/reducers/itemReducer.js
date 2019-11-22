import uuid from 'uuid/v4'

const itemReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return ([
        ...state,
        {
          id: uuid(),
          itemName: action.itemName,
          supplier: action.supplier,
          order: 0,
          showEditForm: false
        }
      ])
    case 'DELETE_ITEM':
      return state.filter(item => {
        if (item.id === action.id) {
          return false
        } else {
          return true
        }
      })
    case 'EDIT_ITEM':
      return state.map(item => {
        if (item.id === action.id) {
          return ({
            ...item,
            itemName: action.itemName,
            supplier: action.supplier
          })
        } else { return item }
      })
    case 'DECREASE_ORDER_AMOUNT':
      return state.map(item => {
        if (item.id === action.id) {
          return ({ ...item, order: item.order - 1 })
        } else { return item }
      })
    case 'INCREASE_ORDER_AMOUNT':
      return state.map(item => {
        if (item.id === action.id) {
          return ({ ...item, order: item.order + 1 })
        } else { return item }
      })
    case 'TOGGLE_EDIT':
      return state.map(item => {
        if (item.id === action.id) {
          return ({
            ...item,
            showEditForm: !item.showEditForm
          })
        } else { return item }
      })
    default:
      throw new Error()
  }
}
export default itemReducer
