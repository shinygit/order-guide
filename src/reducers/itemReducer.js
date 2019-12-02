import uuid from 'uuid/v4'
function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
const itemReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        {
          id: uuid(),
          itemName: action.itemName,
          supplier: action.supplier,
          location: action.location,
          buildTo: action.buildTo,
          order: 0,
          showEditForm: false
        }
      ]
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
          return {
            ...item,
            itemName: action.itemName,
            buildTo: action.buildTo,
            supplier: action.supplier,
            location: action.location
          }
        } else {
          return item
        }
      })
    case 'DECREASE_ORDER_AMOUNT':
      return state.map(item => {
        if (item.id === action.id) {
          return { ...item, order: item.order - 1 }
        } else {
          return item
        }
      })
    case 'INCREASE_ORDER_AMOUNT':
      return state.map(item => {
        if (item.id === action.id) {
          return { ...item, order: item.order + 1 }
        } else {
          return item
        }
      })
    case 'TOGGLE_EDIT':
      return state.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            showEditForm: !item.showEditForm
          }
        } else {
          return item
        }
      })
    case 'SORT_RANDOM':
      return shuffleArray(state.slice())
    case 'SORT_NORMAL':
      return state.slice().sort(function (a, b) {
        if (a.supplier > b.supplier) return 1
        if (a.supplier < b.supplier) return -1
        if (a.location > b.location) return 1
        if (a.location < b.location) return -1
        return 0
      })
    default:
      throw new Error()
  }
}
export default itemReducer
