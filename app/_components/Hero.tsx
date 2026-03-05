import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Globe2, Send, Plane, Landmark} from "lucide-react";

const suggestions=[
    {
        title: 'Create New Trip',
        icon: <Globe2 className='text-blue-400 h-5 w-5'></Globe2>

    },
    {
        title: 'Inspire me where to go',
        icon: <Plane className='text-green-500 h-5 w-5'></Plane>

    },

    {
        title: 'Discover Hidden gems',
        icon: <Landmark className='text-orange-500 h-5 w-5'></Landmark>

    },

    {
        title: 'Adventure Destination',
        icon: <Globe2 className='text-yellow-400 h-5 w-5'></Globe2>

    },


]

function Hero() {
  return (
    <div className='mt-24 flex w-full justify-center '>
        <div className='max-w-3xl w-full text-center space-y-6'>
            <h1 className='text-xl md:text-5xl font-bold'>Hey, I'm your personal <span className='text-primary'>trip planner</span> </h1>
            <p className='text-lg'>Tell me what you want, and I'll handle the rest: Flights, Hotels, Trip planner - all in seconds</p>
            <div>
                <div className='border rounded-2xl p-4 relative'>
                    <Textarea placeholder='Create a trip from Paris to New York' className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'></Textarea>
                    <Button size={'icon'} className='absolute bottom-6 right-6'>
                        <Send className='h-4 w-4'/>
                    </Button>
                </div>
            </div>
            <div className='flex gap-5'>
                {suggestions.map((suggestions,index)=>(
                    <div key={index} className='flex items-center gap-2 px-2 py-2 border rounded-full cursor-pointer hover:bg-primary hover:text-white'>
                        {suggestions.icon}
                        <h2 className='text-sm'>{suggestions.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Hero