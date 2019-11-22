
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL'
    case 'supplierFilter':
      return action.supplier
    default:
      throw new Error()
  }
}

export default filterReducer
