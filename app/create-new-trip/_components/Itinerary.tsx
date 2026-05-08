"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { ArrowLeft, Clock, ExternalLink, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/Provider';
import { TripInfo } from './ChatBox';
// const TRIP_DATA={
    
//         "destination": "California",
//         "duration": "3 Days",
//         "origin": "New York",
//         "budget": "Moderate",
//         "group_size": "2 (Couple)",
//         "hotels": [
//             {
//                 "hotel_name": "Kimpton Sawyer Hotel",
//                 "hotel_address": "500 J St, Sacramento, CA 95814",
//                 "price_per_night": "$180 - $220",
//                 "hotel_image_url": "https://www.kimptonsawyerhotel.com/sites/default/files/styles/hero_image/public/2019-09/Kimpton-Sawyer-Hotel-Exterior.jpg",
//                 "geo_coordinates": {
//                     "latitude": 38.5795,
//                     "longitude": -121.4944
//                 },
//                 "rating": 4.5,
//                 "description": "A boutique hotel in downtown Sacramento blending modern luxury with rustic charm, perfect for couples seeking comfort and adventure."
//             },
//             {
//                 "hotel_name": "The Waterfront Beach Resort",
//                 "hotel_address": "21100 Pacific Coast Hwy, Huntington Beach, CA 92648",
//                 "price_per_night": "$200 - $250",
//                 "hotel_image_url": "https://www.waterfrontresort.com/hubfs/hotels/homepage/waterfront-beach-resort_2.jpg",
//                 "geo_coordinates": {
//                     "latitude": 33.6891,
//                     "longitude": -118.0022
//                 },
//                 "rating": 4.4,
//                 "description": "A beachside resort offering both relaxation and access to thrilling water sports and coastal adventures."
//             },
//             {
//                 "hotel_name": "Courtyard by Marriott San Francisco Downtown",
//                 "hotel_address": "299 2nd St, San Francisco, CA 94105",
//                 "price_per_night": "$190 - $230",
//                 "hotel_image_url": "https://media.marriott.com/marriottassets/marriott/SFODO/sfodo-courtyard-san-francisco-downtown-exterior-0078-hor-feat.jpg",
//                 "geo_coordinates": {
//                     "latitude": 37.7879,
//                     "longitude": -122.3969
//                 },
//                 "rating": 4.3,
//                 "description": "Conveniently located hotel for exploring San Francisco’s iconic outdoor adventure spots."
//             }
//         ],
//         "itinerary": [
//             {
//                 "day": 1,
//                 "day_plan": "Explore Yosemite National Park – Hiking and Waterfalls",
//                 "best_time_to_visit_day": "Morning to Evening",
//                 "activities": [
//                     {
//                         "place_name": "Yosemite National Park",
//                         "place_details": "Renowned for its majestic waterfalls, giant sequoia trees, and challenging hiking trails like Half Dome and Mist Trail.",
//                         "place_image_url": "https://www.nps.gov/yose/planyourvisit/images/YosemiteFalls_1.jpg",
//                         "geo_coordinates": {
//                             "latitude": 37.8651,
//                             "longitude": -119.5383
//                         },
//                         "place_address": "Yosemite National Park, CA",
//                         "ticket_pricing": "Entrance Fee: $35 per vehicle (valid for 7 days)",
//                         "time_travel_each_location": "From Sacramento approx 2.5 hours by car",
//                         "best_time_to_visit": "Early morning to avoid crowds and afternoon for best waterfall views"
//                     }
//                 ]
//             },
//             {
//                 "day": 2,
//                 "day_plan": "Coastal Adventure at Big Sur – Scenic Drive and Hiking",
//                 "best_time_to_visit_day": "Morning to Sunset",
//                 "activities": [
//                     {
//                         "place_name": "Big Sur Coastline",
//                         "place_details": "Drive along Pacific Coast Highway with breathtaking ocean views, stop for hiking at Pfeiffer Big Sur State Park and visit McWay Falls.",
//                         "place_image_url": "https://www.parks.ca.gov/pages/637/images/Pfeiffer_Big_Sur_SP_1.jpg",
//                         "geo_coordinates": {
//                             "latitude": 36.2704,
//                             "longitude": -121.8081
//                         },
//                         "place_address": "Big Sur, CA",
//                         "ticket_pricing": "Park entry: $10 per vehicle",
//                         "time_travel_each_location": "About 3 hours drive from Yosemite to Big Sur",
//                         "best_time_to_visit": "Morning for hikes, sunset at McWay Falls viewpoint"
//                     }
//                 ]
//             },
//             {
//                 "day": 3,
//                 "day_plan": "San Francisco Adventure – Biking and Exploring Landmarks",
//                 "best_time_to_visit_day": "Morning to Afternoon",
//                 "activities": [
//                     {
//                         "place_name": "Golden Gate Park and Golden Gate Bridge",
//                         "place_details": "Bike across the iconic Golden Gate Bridge, explore Golden Gate Park’s outdoor spaces and gardens, and enjoy views of the bay.",
//                         "place_image_url": "https://sfrecpark.org/parks-open-spaces/golden-gate-park/images/ggp-bridge_view.jpg",
//                         "geo_coordinates": {
//                             "latitude": 37.8199,
//                             "longitude": -122.4783
//                         },
//                         "place_address": "Golden Gate Bridge, San Francisco, CA",
//                         "ticket_pricing": "Free access, bike rentals around $30/day",
//                         "time_travel_each_location": "Located in San Francisco",
//                         "best_time_to_visit": "Morning to early afternoon for cooler temperatures and less fog"
//                     }
//                 ]
//             }
//         ]
//     }

function Itinerary() {
  //@ts-ignore
  const {tripDetailInfo,setTripDetailInfo}=useTripDetail()
  const [tripData,setTripData]=useState<TripInfo|null>(null)
  useEffect(()=>{
    tripDetailInfo&& setTripData(tripDetailInfo)
  },[tripDetailInfo])
  const data = tripData?[
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData?.hotels.map((hotel,index)=>(
            <HotelCardItem key={index} hotel={hotel}> </HotelCardItem>
            

          ))}
          
        </div>
      ),
    },
    ...tripData?.itinerary.map((dayData,index)=>({title: `Day ${dayData?.day}`,
      content: (
        <div key={index}>
            <p>Best Time :{dayData?.best_time_to_visit_day}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {dayData?.activities.map((activity,index)=>(
                    <PlaceCardItem key={index} activity={activity}></PlaceCardItem>
                    
                ))}
            </div>
        </div>
      
      )
    })
  )]:[];
  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {tripData?<Timeline data={data} tripData={tripData}/>
        :
        <div>
          <h2 className='flex gap-2 text-3xl text-white items-center left-20 absolute bottom-20'><ArrowLeft></ArrowLeft>Getting to know you to build perfect trip here...</h2>
          <Image src={'https://images.unsplash.com/photo-1518134401586-70feb7eea215?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt='travel' width={'800'} 
          height={800}
          className='w-full h-full object-cover rounded-3xl'/>
          
        </div>

      }
    </div>
  );
}

export default Itinerary