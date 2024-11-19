import React, { useState } from 'react';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs mt-3 flex gap-8 p-4 border-b border-gray-300">
      {['Overview', 'Amenities', 'Policies'].map((tab) => (
        <a
          key={tab}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleTabClick(tab);
          }}
          className={`${
            activeTab === tab
              ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
              : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          {tab}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
