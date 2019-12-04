const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL'
    case 'FILTER_SEARCH':
      return action.results
    case 'FILTER_SUPPLIER':
      return action.supplier
    case 'FILTER_LOCATION':
      return action.location
    default:
      throw new Error()
  }
}

export default filterReducer
