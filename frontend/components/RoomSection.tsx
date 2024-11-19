import React from 'react';

const RoomsSection = () => {
  const rooms = [
    { name: "Bedroom 1", bedType: "Queen Bed", bedCount: 1 },
    { name: "Bedroom 2", bedType: "Twin Bed", bedCount: 1 },
  ];

  const spaces = [
    { name: "Deck or patio", icon: "fa-umbrella-beach" },
    { name: "Kitchen", icon: "fa-utensils" },
    { name: "Balcony", icon: "fa-archway" },
    { name: "Garden", icon: "fa-tree" },
  ];

  return (
    <div className="mt-8">
      {/* Rooms & Beds Section */}
      <h2 className="text-2xl font-semibold mb-4">Rooms & Beds</h2>
      <div className="mb-4 text-gray-600">2 bedrooms (sleeps 4)</div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            <div className="text-xl font-bold mb-2">{room.name}</div>
            <div className="flex items-center text-gray-600">
              <i className="fas fa-bed mr-2"></i>
              <span>{room.bedCount} {room.bedType}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bathroom Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">1 bathroom</h3>
        <div className="flex items-center text-gray-600">
          <i className="fas fa-bath mr-2"></i>
          <span>Full Bathroom</span>
        </div>
      </div>

      {/* Spaces Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Spaces</h3>
        <ul className="space-y-4">
          {spaces.map((space, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <i className={`fas ${space.icon} mr-3`}></i>
              <span>{space.name}</span>
            </li>
          ))}
        </ul>
        <a href="#" className="text-blue-500 mt-4 block">See all rooms and beds details</a>
      </div>
    </div>
  );
};

export default RoomsSection;
