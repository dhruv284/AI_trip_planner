import Image from 'next/image'
import React from 'react'
import { MapPin, Star } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Bali',
    country: 'Indonesia',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Paris',
    country: 'France',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Dubai',
    country: 'UAE',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Tokyo',
    country: 'Japan',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Santorini',
    country: 'Greece',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Swiss Alps',
    country: 'Switzerland',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
  },
]

function page() {
  return (
    <div className='min-h-screen bg-white px-6 md:px-20 py-16'>
      
      {/* Hero Section */}
      <div className='text-center max-w-3xl mx-auto'>
        <h1 className='text-5xl font-bold text-black'>
          Explore Amazing{' '}
          <span className='text-orange-500'>
            Destinations
          </span>
        </h1>

        <p className='text-gray-500 mt-6 text-lg'>
          Discover trending travel destinations around the world and plan your next unforgettable adventure.
        </p>
      </div>

      {/* Search Bar */}
      <div className='max-w-2xl mx-auto mt-12'>
        <input
          type='text'
          placeholder='Search destinations...'
          className='w-full border border-gray-300 rounded-2xl p-5 outline-none focus:border-orange-500 shadow-sm'
        />
      </div>

      {/* Categories */}
      <div className='flex flex-wrap justify-center gap-4 mt-10'>
        <button className='bg-orange-500 text-white px-6 py-3 rounded-full font-medium'>
          Trending
        </button>

        <button className='border border-gray-300 px-6 py-3 rounded-full font-medium hover:border-orange-500'>
          Beaches
        </button>

        <button className='border border-gray-300 px-6 py-3 rounded-full font-medium hover:border-orange-500'>
          Mountains
        </button>

        <button className='border border-gray-300 px-6 py-3 rounded-full font-medium hover:border-orange-500'>
          Adventure
        </button>

        <button className='border border-gray-300 px-6 py-3 rounded-full font-medium hover:border-orange-500'>
          Luxury
        </button>
      </div>

      {/* Destination Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
        {destinations.map((item) => (
          <div
            key={item.id}
            className='bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer'
          >
            
            {/* Image */}
            <div className='relative h-[260px] w-full'>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className='object-cover'
              />
            </div>

            {/* Content */}
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-semibold'>
                  {item.name}
                </h2>

                <div className='flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full'>
                  <Star
                    size={16}
                    className='text-orange-500 fill-orange-500'
                  />

                  <span className='font-medium text-sm'>
                    {item.rating}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-2 mt-3 text-gray-500'>
                <MapPin size={18} />
                <p>{item.country}</p>
              </div>

              <button className='w-full mt-6 bg-orange-500 hover:bg-orange-600 transition-all text-white py-3 rounded-2xl font-medium'>
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default page