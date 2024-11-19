// components/HouseRules.tsx

import React, { useState } from 'react';

const HouseRules: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* First Column (Title) */}
      <div className="md:col-span-1 text-xl font-semibold text-[#1a1a1a]">
        House Rules
      </div>

      {/* Second Column (Rules Content) */}
      <div className="md:col-span-2 space-y-4">
        {/* Check-In/Out Times */}
        <div className={`space-y-2 ${isExpanded ? '' : 'hidden md:block'}`}>
          <div className="text-lg font-medium">Check-In/Out Times</div>
          <div className="text-sm text-gray-600">
            <div>Check in after 3:00 PM</div>
            <div>Check out before 11:00 AM</div>
            {isExpanded && <div>Check out before 11:00 AM</div>}
          </div>
        </div>

        {/* House Rules Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isExpanded ? '' : 'hidden md:grid'}`}>
          {/* Rule 1 */}
          <div className="flex items-start space-x-2">
            <i className="fa-solid fa-children text-gray-600"></i>
            <div>
              <div className="font-semibold">Children</div>
              <div className="text-sm text-gray-600">Children allowed: ages 0-17</div>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex items-start space-x-2">
            <i className="fa-solid fa-calendar text-gray-600"></i>
            <div>
              <div className="font-semibold">Events</div>
              <div className="text-sm text-gray-600">No events allowed</div>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex items-start space-x-2">
            <i className="fa fa-paw text-gray-600" aria-hidden="true"></i>
            <div>
              <div className="font-semibold">Pets</div>
              <div className="text-sm text-gray-600">No pets allowed</div>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex items-start space-x-2">
            <i className="fa-solid fa-ban-smoking text-gray-600"></i>
            <div>
              <div className="font-semibold">Smoking</div>
              <div className="text-sm text-gray-600">Smoking is not permitted</div>
            </div>
          </div>
        </div>
      </div>

      {/* See more button only on mobile view */}
      <div className="md:hidden text-blue-500 mt-4">
        <button onClick={toggleExpansion}>
          {isExpanded ? 'See less' : 'See more'}
        </button>
      </div>
    </div>
  );
};

export default HouseRules;
