import React from 'react'
const SortMenu = ({
  setItemsCurrentlySorted,
  dispatchSort,
  dispatchItems,
  items
}) => {
  const handleSortRandom = () => {
    dispatchItems({ type: 'SORT_RANDOM' })
  }
  const handleSortNormal = () => {
    dispatchItems({ type: 'SORT_NORMAL' })
  }
  return (
    <div>
      <button onClick={() => handleSortRandom()}>Random</button>
      <button onClick={() => handleSortNormal()}>Normal</button>
    </div>
  )
}
export default SortMenu
