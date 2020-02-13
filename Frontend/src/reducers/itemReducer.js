// import uuid from 'uuid/v4'
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
const itemReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_ITEMS':
      return action.items
    case 'SORT_RANDOM':
      return shuffleArray(state.slice())
    case 'SORT_NORMAL':
      return state.slice().sort(function(a, b) {
        if (a.supplier > b.supplier) return 1
        if (a.supplier < b.supplier) return -1
        if (a.location > b.location) return 1
        if (a.location < b.location) return -1
        if (a.itemName > b.itemName) return 1
        if (a.itemName < b.itemName) return -1
        return 0
      })
    default:
      throw new Error()
  }
}
export default itemReducer
