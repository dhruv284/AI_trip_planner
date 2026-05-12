"use client"

import { Trip } from "@/app/my-trips/page";
import { useUserDetail } from "@/app/Provider";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewTrip() {
  const { tripid } = useParams();
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
    console.log(result);
    setTripData(result)
  };
  return <div>ViewTrip</div>;
}

export default ViewTrip;
