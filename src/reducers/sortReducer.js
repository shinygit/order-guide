function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
const sortReducer = (state, action) => {
  switch (action.type) {
    case 'NO_SORT':
      return false
    case 'SORT_RANDOM':
      return shuffleArray(action.items)
    default:
      throw new Error()
  }
}

export default sortReducer
