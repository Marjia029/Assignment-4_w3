import { useState } from 'react';

const BookingCard: React.FC = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState('Nov 18');
  const [endDate, setEndDate] = useState('Nov 20');
  const [petChecked, setPetChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const limits = {
    adults: { min: 1, max: 9 },
    children: { min: 0, max: 9 },
  };

  const totalTravelers = adults + children;

  const handleIncrease = (type: 'adults' | 'children') => {
    if (type === 'adults' && adults < limits.adults.max) {
      setAdults(adults + 1);
    }
    if (type === 'children' && children < limits.children.max) {
      setChildren(children + 1);
    }
  };

  const handleDecrease = (type: 'adults' | 'children') => {
    if (type === 'adults' && adults > limits.adults.min) {
      setAdults(adults - 1);
    }
    if (type === 'children' && children > limits.children.min) {
      setChildren(children - 1);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="booking-card p-6 bg-white rounded-lg shadow-md max-w-md mx-auto sm:max-w-none sm:w-full">
      {/* Price and Free Cancellation */}
      <div className="price text-2xl font-bold text-gray-800">
        $134 <span className="font-normal text-sm">per night</span>
      </div>
      <div className="free-cancel flex items-center mt-2 text-green-600">
        <i className="fas fa-check-circle mr-2"></i>
        Free cancellation
      </div>

      {/* Date Picker */}
      <div className="date-picker flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
        <div className="date-input-container flex items-center w-full sm:w-auto">
          <i className="fas fa-calendar-alt mr-2"></i>
          <input
            type="text"
            className="date-input border px-4 py-2 rounded-lg w-full"
            placeholder="Start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="date-input-container flex items-center w-full sm:w-auto">
          <i className="fas fa-calendar-alt mr-2"></i>
          <input
            type="text"
            className="date-input border px-4 py-2 rounded-lg w-full"
            placeholder="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Traveler Selector */}
      <div className="traveler-selector mt-4">
        <button
          className="selector-bar flex justify-between items-center w-full p-2 border rounded-lg"
          onClick={toggleDropdown}
        >
          <span className="total-travelers">{totalTravelers} Traveler{totalTravelers !== 1 ? 's' : ''}</span>
          <span className={`chevron ${isDropdownOpen ? 'up' : 'down'}`}>&#9660;</span>
        </button>

        {isDropdownOpen && (
          <div className="dropdown-panel mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            {/* Adults */}
            <div className="traveler-type mb-4">
              <div className="traveler-header flex justify-between items-center">
                <div className="traveler-info">
                  <h3 className="text-lg font-semibold">Adults</h3>
                  <p className="text-sm text-gray-600">Age 13+</p>
                </div>
                <div className="counter flex items-center">
                  <button
                    className="counter-btn bg-gray-300 px-3 py-1 rounded-lg"
                    data-type="adults"
                    data-action="decrease"
                    onClick={() => handleDecrease('adults')}
                    disabled={adults <= limits.adults.min}
                  >
                    -
                  </button>
                  <span className="counter-value mx-2">{adults}</span>
                  <button
                    className="counter-btn bg-gray-300 px-3 py-1 rounded-lg"
                    data-type="adults"
                    data-action="increase"
                    onClick={() => handleIncrease('adults')}
                    disabled={adults >= limits.adults.max}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Children */}
            <div className="traveler-type mb-4">
              <div className="traveler-header flex justify-between items-center">
                <div className="traveler-info">
                  <h3 className="text-lg font-semibold">Children</h3>
                  <p className="text-sm text-gray-600">Age 0-12</p>
                </div>
                <div className="counter flex items-center">
                  <button
                    className="counter-btn bg-gray-300 px-3 py-1 rounded-lg"
                    data-type="children"
                    data-action="decrease"
                    onClick={() => handleDecrease('children')}
                    disabled={children <= limits.children.min}
                  >
                    -
                  </button>
                  <span className="counter-value mx-2">{children}</span>
                  <button
                    className="counter-btn bg-gray-300 px-3 py-1 rounded-lg"
                    data-type="children"
                    data-action="increase"
                    onClick={() => handleIncrease('children')}
                    disabled={children >= limits.children.max}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Traveling with Pets */}
            <div className="traveler-checkbox mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="traveling-with-pets"
                  checked={petChecked}
                  onChange={() => setPetChecked(!petChecked)}
                  className="mr-2"
                />
                I am traveling with pets
              </label>
            </div>

            {/* Done Button */}
            <div>
              <button
                className="done-button bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
                onClick={toggleDropdown}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="mt-4 flex justify-between items-center text-lg font-semibold">
        <span>Total</span>
        <span>$543</span>
      </div>

      {/* Book Button */}
      <button className="book-button bg-blue-600 text-white mt-4 py-2 px-4 rounded-lg w-full flex justify-center items-center">
        <i className="fas fa-lock mr-2"></i>
        Book now
      </button>
      <p className="text-center text-sm text-gray-500 mt-2">You will not be charged yet</p>

      {/* Contact Host Button */}
      <button className="book-button contact-host bg-green-600 text-white mt-4 py-2 px-4 rounded-lg w-full flex justify-center items-center">
        <i className="fas fa-envelope mr-2"></i>
        Contact host
      </button>
    </div>
  );
};

export default BookingCard;
