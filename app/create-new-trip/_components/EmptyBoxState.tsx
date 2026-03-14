import { suggestions } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({onSelectOption}:any) {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-3xl text-center'>Start Planning New <strong className='text-primary'>Trip</strong> Using AI</h2>
        <p className='text-center text-gray-400 mt-2'></p>
        <div className='flex flex-col gap-5 mt-7'>
          {suggestions.map((suggestions,index)=>(
              <div key={index} onClick={()=>onSelectOption(suggestions.title)}
              className='flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:border-primary hover:text-primary'>
                  {suggestions.icon}
                  <h2 className='text-lg'>{suggestions.title}</h2>
              </div>
          ))}
        </div>
    </div>
  )
}

export default EmptyBoxState