'use client';

// components/Navbar/RegionSelector.tsx
import { useState, useEffect } from 'react';
import { RegionSelectorProps } from './types';
import { COUNTRIES, CURRENCIES } from './constants';

const RegionSelector = ({ selectedRegion, selectedCurrency }: RegionSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState('United States');
  const [currentCurrency, setCurrentCurrency] = useState('USD');

  // Load saved values on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRegion = localStorage.getItem('selectedRegion');
      const savedCurrency = localStorage.getItem('selectedCurrency');
      
      if (savedRegion) {
        setCurrentRegion(savedRegion);
      }
      if (savedCurrency) {
        setCurrentCurrency(savedCurrency);
      }
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedRegion', currentRegion);
      localStorage.setItem('selectedCurrency', currentCurrency);
    }
    setIsOpen(false);
    
    // Force a page reload to update all components
    window.location.reload();
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-black hover:text-gray-700"
      >
        <i className="fas fa-globe-americas"></i>
        <span>{currentRegion}</span>
        {/* <span>({currentCurrency})</span> */}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Region Settings</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <select 
                  className="w-full border rounded-md p-2"
                  value={currentRegion}
                  onChange={(e) => setCurrentRegion(e.target.value)}
                >
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select 
                  className="w-full border rounded-md p-2"
                  value={currentCurrency}
                  onChange={(e) => setCurrentCurrency(e.target.value)}
                >
                  {CURRENCIES.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegionSelector;