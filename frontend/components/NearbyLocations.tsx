import React from "react";
import { FaMapMarkerAlt, FaUniversity, FaGolfBall, FaPlane } from "react-icons/fa"; // Importing specific icons

interface LocationItem {
  icon: React.ReactNode;
  name: string;
  driveTime: string;
}

const NearbyLocations: React.FC = () => {
  // Define the nearbyLocations array inside the component
  const nearbyLocations: LocationItem[] = [
    {
      icon: <FaMapMarkerAlt />,
      name: "Auke Bay",
      driveTime: "6 min drive"
    },
    {
      icon: <FaUniversity />,
      name: "University of Alaska-Southeast",
      driveTime: "10 min drive"
    },
    {
      icon: <FaGolfBall />,
      name: "Mendenhall Golf Course",
      driveTime: "14 min drive"
    },
    {
      icon: <FaPlane />,
      name: "Juneau, AK(JNU-Juneau Intl.)",
      driveTime: "14 min drive"
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Nearby Locations</h2>
      {nearbyLocations.map((location, index) => (
        <div className="flex justify-between items-center" key={index}>
          <div className="flex items-center space-x-2">
            {location.icon}
            <span className="text-lg font-medium">{location.name}</span>
          </div>
          <span className="text-sm text-gray-600">{location.driveTime}</span>
        </div>
      ))}
      <div className="text-left">
        <a href="#" className="text-blue-600 hover:underline">See more about this area &gt;</a>
      </div>
    </div>
  );
};

export default NearbyLocations;
