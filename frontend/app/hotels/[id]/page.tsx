"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use the correct hook
import { Hotel } from "@/models/hotelModel";

export default function HotelDetails() {
  const { id } = useParams();  // Use the hook to get the dynamic param
  const [hotel, setHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    console.log("Fetching details for hotel with ID:", id); // Debug log
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/hotels/${id}`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch hotel details");
        }
        const data: Hotel = await response.json();
        console.log("Fetched hotel details:", data); // Debug log
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    if (id) {
      fetchHotelDetails();
    }
  }, [id]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{hotel.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Conditionally render the image only if there's a valid URL */}
        {hotel.images.length > 0 && hotel.images[0] ? (
          <img
            src={`http://localhost:5000${hotel.images[0]}`}
            alt={hotel.title}
            className="w-full h-60 object-cover rounded-lg"
          />
        ) : (
          <div>No image available</div> // You can show a placeholder or message
        )}
        <p className="mt-4">{hotel.description}</p>
        <p className="mt-2 font-semibold">Address: {hotel.address}</p>
        <p className="mt-2">Guest Count: {hotel.guestCount}</p>
        <p className="mt-2">Bedroom Count: {hotel.bedroomCount}</p>
        <p className="mt-2">Bathroom Count: {hotel.bathroomCount}</p>

        <h2 className="mt-4 text-xl font-semibold">Rooms:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotel.rooms.map((room) => (
            <div key={room.roomSlug} className="bg-white p-4 shadow-md rounded-lg">
              {/* Conditionally render the image for each room */}
              {room.roomImage ? (
                <img
                  src={`http://localhost:5000${room.roomImage}`}
                  alt={room.roomTitle}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div>No room image available</div> // Placeholder for missing room image
              )}
              <h3 className="text-lg font-semibold mt-2">{room.roomTitle}</h3>
              <p>Bedrooms: {room.bedroomCount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
