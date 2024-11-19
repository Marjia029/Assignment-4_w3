import React from "react";

interface AmenitiesProps {
  amenities: string[];
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="text-gray-700">
            {amenity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
