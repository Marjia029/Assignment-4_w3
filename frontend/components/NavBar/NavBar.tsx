'use client';
// components/Navbar/Navbar.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import RegionSelector from './RegionSelector';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('United States');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSelectedRegion(localStorage.getItem('selectedRegion') || 'United States');
      setSelectedCurrency(localStorage.getItem('selectedCurrency') || 'USD');
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-transparent shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-black text-xl font-bold">
              Brand
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              <i className="fas fa-user-circle text-2xl" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className={`hidden md:flex md:items-center md:space-x-6 text-black`}>
            <RegionSelector 
              selectedRegion={selectedRegion}
              selectedCurrency={selectedCurrency}
            />
            <Link href="/trip-boards" className="text-black hover:text-gray-600">
              Trip Boards
            </Link>
            <Link href="/list-property" className="text-black hover:text-gray-600">
              List your property
            </Link>
            <Link href="/help" className="text-black hover:text-gray-600">
              Help
            </Link>
            <Link href="/my-trip" className="text-black hover:text-gray-600">
              My Trip
            </Link>
            <Link href="/signin" className="text-black hover:text-gray-600">
              Sign in
            </Link>
          </div>

          {/* Mobile navigation */}
          <div
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } md:hidden fixed inset-0 z-50 bg-white`}
          >
            <div className="p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-2xl"
              >
                &times;
              </button>
              <div className="flex flex-col text-black space-y-4 mt-8">
                <RegionSelector 
                  selectedRegion={selectedRegion}
                  selectedCurrency={selectedCurrency}
                />
                <Link href="/trip-boards" className="hover:text-gray-600">
                  Trip Boards
                </Link>
                <Link href="/list-property" className="hover:text-gray-600">
                  List your property
                </Link>
                <Link href="/help" className="hover:text-gray-600">
                  Help
                </Link>
                <Link href="/my-trip" className="hover:text-gray-600">
                  My Trip
                </Link>
                <Link href="/signin" className="hover:text-gray-600">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;