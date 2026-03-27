import React from 'react'

const interests = [
  "Adventure",
  "Sightseeing",
  "Cultural",
  "Food",
  "Nightlife",
  "Relaxation"
]

function InterestsUi({ onSelectOption }: any) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {interests.map((item) => (
        <button
          key={item}
          onClick={() => onSelectOption(item)}
          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-full text-sm"
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default InterestsUi