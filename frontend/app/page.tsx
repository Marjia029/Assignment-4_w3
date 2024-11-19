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
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to Next.js!</h1>
      <div className="flex flex-col gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => handleClick(hotel)}
            className="bg-white w-96 h-44 p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition duration-300 flex flex-col"
          >
            {hotel.images?.[0] && (
              <img
                src={`http://localhost:5000${hotel.images[0]}`}
                alt={hotel.title}
                className="w-48 h-32 rounded-md object-cover mx-auto mb-2"
              />
            )}
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-xl font-semibold text-center">{hotel.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
