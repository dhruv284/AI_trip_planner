import React from 'react'
import { Mail, MapPin, Clock } from 'lucide-react'

function page() {
  return (
    <div className='min-h-screen bg-white px-6 md:px-20 py-16'>
      
      {/* Hero Section */}
      <div className='text-center max-w-3xl mx-auto'>
        <h1 className='text-5xl font-bold text-black'>
          Contact <span className='text-orange-500'>Us</span>
        </h1>

        <p className='text-gray-500 mt-6 text-lg'>
          Have questions, feedback, or partnership ideas? We'd love to hear from you.
        </p>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20'>
        
        {/* Contact Form */}
        <div className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm'>
          <h2 className='text-2xl font-semibold mb-6'>
            Send us a message
          </h2>

          <form className='space-y-5' action='https://formspree.io/f/mgodqzag' method='POST'>
            
            {/* Name */}
            <div>
              <label className='block mb-2 font-medium'>
                Name
              </label>

              <input
                type='text'
                placeholder='Enter your name'
                name='name'
                className='w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-orange-500'
              />
            </div>

            {/* Email */}
            <div>
              <label className='block mb-2 font-medium'>
                Email
              </label>

              <input
                type='email'
                name='email'
                placeholder='Enter your email'
                className='w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-orange-500'
              />
            </div>

            {/* Subject */}
            <div>
              <label className='block mb-2 font-medium'>
                Subject
              </label>

              <input
                type='text'
                name='subject'
                placeholder='Enter subject'
                className='w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-orange-500'
              />
            </div>

            {/* Message */}
            <div>
              <label className='block mb-2 font-medium'>
                Message
              </label>

              <textarea
                rows={6}
                name='message'
                placeholder='Write your message...'
                className='w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-orange-500 resize-none'
              />
            </div>

            {/* Button */}
            <button type='submit' className='w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold py-4 rounded-xl'>
              Send Message
            </button>

          </form>
        </div>

        {/* Contact Info */}
        <div className='space-y-6'>

          {/* Email Card */}
          <div className='border border-gray-200 rounded-3xl p-6 flex items-start gap-4 shadow-sm'>
            <div className='bg-orange-100 p-3 rounded-2xl'>
              <Mail className='text-orange-500' />
            </div>

            <div>
              <h3 className='font-semibold text-xl'>
                Email Us
              </h3>

              <p className='text-gray-500 mt-2'>
                support@aitripplanner.com
              </p>
            </div>
          </div>

          {/* Location Card */}
          <div className='border border-gray-200 rounded-3xl p-6 flex items-start gap-4 shadow-sm'>
            <div className='bg-orange-100 p-3 rounded-2xl'>
              <MapPin className='text-orange-500' />
            </div>

            <div>
              <h3 className='font-semibold text-xl'>
                Location
              </h3>

              <p className='text-gray-500 mt-2'>
                Pune, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Support Card */}
          <div className='border border-gray-200 rounded-3xl p-6 flex items-start gap-4 shadow-sm'>
            <div className='bg-orange-100 p-3 rounded-2xl'>
              <Clock className='text-orange-500' />
            </div>

            <div>
              <h3 className='font-semibold text-xl'>
                Support Time
              </h3>

              <p className='text-gray-500 mt-2'>
                Mon - Fri : 9 AM - 6 PM
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default page