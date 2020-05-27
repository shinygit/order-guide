import React from 'react'
const LocationFilterButtons = ({
  locations,
  handleShowLocation,
  activeFilterbuttonClass,
}) => {
  return locations.map((location) => (
    <button
      className={`transition duration-200 ease-in-out w-auto p-4 m-1 border border-gray-900 rounded 
      ${
        activeFilterbuttonClass === `${location}-filter-button`
          ? 'bg-gray-600 text-gray-200'
          : 'bg-gray-400'
      }`}
      key={location}
      onClick={() => handleShowLocation(location)}
    >
      {location}
    </button>
  ))
}
export default LocationFilterButtons
