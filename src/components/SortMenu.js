import React from 'react'
const SortMenu = ({ setItemsCurrentlySorted, dispatchSort, items }) => {
  const handleSortRandom = () => {
    setItemsCurrentlySorted(true)
    dispatchSort({ type: 'SORT_RANDOM', items: items })
  }
  return (
    <div>
      <button onClick={() => handleSortRandom()}>Random</button>
    </div>
  )
}
export default SortMenu
