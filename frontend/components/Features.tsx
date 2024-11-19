import React from "react";
import { FaBed, FaBath, FaUserFriends, FaHome } from "react-icons/fa";

interface FeaturesProps {
  bedroomCount: number;
  bathroomCount: number;
}

const Features: React.FC<FeaturesProps> = ({ bedroomCount, bathroomCount }) => {
  return (
    <>
        <div className="flex gap-4 text-xl mt-6">
            <span className="bg-green-900 text-white rounded-lg px-4 py-1 ">9.8</span>

            <span>Exceptional</span>
            
        </div>
        <div className="features mt-6 grid grid-cols-2 gap-4 text-gray-700">
            <div className="feature flex items-center gap-2">
                <FaBed />
                <span>{bedroomCount} bedrooms</span>
            </div>
            <div className="feature flex items-center gap-2">
                <FaBath />
                <span>{bathroomCount} bathroom{bathroomCount > 1 ? "s" : ""}</span>
            </div>
            <div className="feature flex items-center gap-2">
                <FaUserFriends />
                <span>Sleeps 4</span>
            </div>
            <div className="feature flex items-center gap-2">
                <FaHome />
                <span>1155 sq ft</span>
            </div>
        </div>
    </>

    
  );
};

export default Features;
