"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Hotel } from "@/models/hotelModel";
import ImageGallery from "@/components/ImageGallery";
import GalleryTop from "@/components/GalleryTop";
import Tabs from "@/components/Tabs";
import Title from "@/components/Title";
import Amenities from "@/components/Amenities";
import Features from "@/components/Features";
import Map from "@/components/Map";
import NearbyLocations from "@/components/NearbyLocations";
import SignIn from "@/components/SignIn"; 
import BookingCard from '@/components/BookingCard';
import RoomsSection from '@/components/RoomSection';
import PropertyDescription from '@/components/PropertyDescription';
import QuestionCard from '@/components/QuestionCard';
import HouseRules from '@/components/HouseRules';

export default function HotelDetails() {
  const { slug, id } = useParams(); // Use the hook to get the dynamic param
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

  const {
    title,
    description,
    address,
    guestCount,
    bedroomCount,
    bathroomCount,
    images,
    rooms,
    amenities,
    hostInfo,
    latitude,
    longitude,
  } = hotel;

  // Filter valid images
  const hotelImages = images.filter((image) => image);
  const roomImages = rooms.map((room) => room.roomImage).filter((image) => image);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Gallery Top */}
      <GalleryTop hotelImages={hotelImages} hotelTitle={title} hotelAddress={address} />

      {/* Image Gallery */}
      <div>
        <ImageGallery hotelImages={hotelImages} roomImages={roomImages} />
      </div>

      {/* Tabs - Ensure it's placed immediately below the ImageGallery */}
      <div>
        <Tabs />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Column: Title, Features, Amenities, Map, Nearby Locations */}
        <div className="col-span-2">
          <div className="mt-4">
            <Title title={title} description={description} />
          </div>
          <div className="mt-4">
            <Features bedroomCount={bedroomCount} bathroomCount={bathroomCount} />
          </div>
          <div className="mt-4">
            <Amenities amenities={amenities} />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Map latitude={latitude} longitude={longitude} locationName={address} />
            <NearbyLocations />
          </div>
          <div className="container mx-auto p-4">
            <RoomsSection />
          </div>
                
        </div>

        {/* Second Column: SignIn and BookingCard */}
        <div>
          <div className="mt-4">
            <SignIn />
          </div>
          <div className="mt-4">
            <BookingCard />
          </div>
        </div>

        
      </div>
      <div className="container">
            <PropertyDescription />
      </div>
      
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4 pl-1">Amenities</h2>
        </div>
        <div>
          <Amenities amenities={amenities} />
        </div>

          
      </div>

      <div className="mt-6">
        <QuestionCard/>

      </div>

      <div className="mt-4">
          <HouseRules />
      </div>

      
    </div>
  );
}
