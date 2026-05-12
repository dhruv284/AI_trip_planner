"use client"

import Itinerary from "@/app/create-new-trip/_components/Itinerary";
import { Trip } from "@/app/my-trips/page";
import { useTripDetail, useUserDetail } from "@/app/Provider";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewTrip() {
  
  const { tripid } = useParams();
  console.log("params", tripid)
  //@ts-ignore
  const {tripDetailInfo,setTripDetailInfo}=useTripDetail()
  const { userDetail, setUserDetaill } = useUserDetail();
  const [tripData,setTripData]=useState<Trip>()
  useEffect(()=>{
    userDetail && GetTrip()
  },[userDetail])
  const convex = useConvex();
  const GetTrip = async () => {
    const result = await convex.query(api.tripDetail.GetTripById, {
      uid: userDetail?._id,
      tripid: tripid + "",
    });
    
    console.log("hi",result);
    setTripData(result)
    setTripDetailInfo(result?.tripDetail)
  };
  return <div><Itinerary></Itinerary></div>;
}

export default ViewTrip;
