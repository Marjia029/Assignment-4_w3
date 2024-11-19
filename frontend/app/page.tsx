"use client";

import { useEffect, useState } from "react";
import { Hotel } from "@/models/hotelModel";
import { useRouter } from "next/navigation";

export default function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:5000/hotels");
        const data: Hotel[] = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleClick = (hotel: Hotel) => {
    console.log("Navigating to hotel with ID:", hotel.id); // Debug log
    router.push(`/hotels/${hotel.slug}/${hotel.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to Next.js!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => handleClick(hotel)}
            className="bg-white p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold">{hotel.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
