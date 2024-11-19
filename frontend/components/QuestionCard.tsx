// components/QuestionCard.tsx

import React from 'react';

const QuestionCard: React.FC = () => {
  return (
    <div className="bg-[#E7FAFB] rounded-lg h-[200px] grid grid-cols-1">
      <div className="p-5 gap-4 grid">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[#1a1a1a]">Have a question?</h3>
          <span className="bg-[#1a1a1a] text-white py-1 px-2 rounded-md text-sm font-medium">Beta</span>
        </div>
        <p className="text-[#666] text-sm mb-4">Get instant answers with AI-powered search of property information and reviews.</p>
        <div className="relative flex items-center">
          <svg className="absolute left-3 text-[#666]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="flex-grow py-3 pl-12 pr-10 border border-[#e0e0e0] rounded-lg text-sm bg-white"
            placeholder="Ask a question: Is there free parking?"
          />
          <div className="absolute right-3 bg-[#e8f0fe] rounded-full p-2 flex items-center justify-center cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 16 16 12 12 8"></polyline>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
