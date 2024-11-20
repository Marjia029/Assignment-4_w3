import React, { useState } from 'react';

const PropertyDescription = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-8 flex">
      {/* Property Description Section with 2/3 Width on Larger Screens */}
      <div className="w-full md:w-2/3">
        {/* About this Property Section */}
        <div className="mb-6">
          <div className="text-2xl font-semibold mb-4">About this property</div>

          <div className="mb-6">
            <div className="text-xl font-semibold mb-2">Mountain View Retreat: Scenic Escape + Forest Access</div>
            <p className="text-gray-600">
              Welcome to our peaceful mountain sanctuary! This charming 2-bedroom, 1-bath home offers the perfect blend of comfort and natural beauty.
              Nestled in the heart of pristine wilderness, you'll find yourself surrounded by towering pines and breathtaking mountain vistas. Spend your days exploring
              nearby hiking trails, wildlife watching, or simply relaxing on the private deck.
            </p>
          </div>

          {/* Property Details Section */}
          <div className={`mb-6 ${isExpanded ? '' : 'hidden md:block'}`}>
            <p className="text-lg font-medium">-- THE PROPERTY --</p>
            <div className="text-gray-600">
              <p>MV1023456 | 1000 Sq Ft | Private Deck | Mountain & Forest Views | 2 Bicycles Available</p>
              <p>Bedroom 1: King Bed, Premium Mattress | Bedroom 2: Two Twin Beds</p>
            </div>
          </div>

          {/* Amenities Section */}
          <div className={`mb-6 ${isExpanded ? '' : 'hidden md:block'}`}>
            <p className="text-lg font-medium">HOME FEATURES</p>
            <div className="text-gray-600">
              <p>Smart TV, dining area, in-unit laundry</p>
              <p>KITCHEN: Full appliance suite, cookware, coffee maker, dishwasher</p>
              <p>GENERAL: High-speed WiFi, central heating, linens provided, hair dryer</p>
              <p>PARKING: 2 dedicated spaces</p>
            </div>
          </div>

          {/* Location Section */}
          <div className={`mb-6 ${isExpanded ? '' : 'hidden md:block'}`}>
            <p className="text-lg font-medium">-- THE LOCATION --</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>OUTDOOR ACTIVITIES: Hiking trails (0.5 mile), Mountain lookout (2 miles)</li>
              <li>ATTRACTIONS: Historic downtown (5 miles), Art Gallery (3 miles)</li>
              <li>DINING: Local Cafe (1 mile), Mountain Brewery (2 miles)</li>
              <li>TRANSPORT: Regional Airport (15 miles)</li>
            </ul>
          </div>

          {/* Guest Services Section */}
          <div className={`mb-6 ${isExpanded ? '' : 'hidden md:block'}`}>
            <p className="text-lg font-medium">-- GUEST SERVICES --</p>
            <p className="text-gray-600">We strive to provide an exceptional experience for all our guests. Our team is available 24/7 to ensure your comfort and address any needs during your stay.</p>
          </div>

          {/* Policies Section */}
          <div className={`mb-6 ${isExpanded ? '' : 'hidden md:block'}`}>
            <p className="text-lg font-medium">-- POLICIES --</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>No smoking</li>
              <li>No pets permitted</li>
              <li>Quiet hours: 10 PM - 8 AM</li>
              <li>Minimum age: 25 years</li>
              <li>Additional fees and taxes apply</li>
              <li>Check-in photo ID required</li>
            </ul>

            <div className="mt-4 text-gray-600">
              <p className="font-medium">NOTE: Property has heating but no air conditioning</p>
              <p className="font-medium">NOTE: Maximum occupancy is 4 guests</p>
            </div>
          </div>

          {/* Property Manager Section */}
          <div className={`mb-6 ${isExpanded ? '' : 'hidden md:block'}`}>
            <div className="font-semibold text-lg mb-2">Property manager</div>
            <img src="./assets/property-manager/property-manager.png" alt="Property Management Logo" className="mb-4" />
          </div>

          {/* Languages Section */}
          <div className={`mb-6 ${isExpanded ? '' : 'hidden md:block'}`}>
            <div className="font-semibold text-lg mb-2">Languages</div>
            <p className="text-gray-600">English, Spanish, French, German</p>
          </div>

          {/* See More Link for Mobile */}
          <div className="text-blue-500 block md:hidden mt-4">
            <button onClick={toggleExpand}>{isExpanded ? 'See Less' : 'See More'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDescription;
