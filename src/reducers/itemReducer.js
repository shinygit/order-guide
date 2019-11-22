import uuid from 'uuid/v4'

const itemReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return ([
        ...state,
        {
          id: uuid(),
          itemName: action.itemName,
          supplier: action.supplier
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
    default:
      throw new Error()
  }
}
export default itemReducer
