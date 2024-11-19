import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaShareAlt, FaHeart, FaComment, FaWhatsapp, FaFacebookMessenger, FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface GalleryTopProps {
  hotelImages: string[];
  hotelTitle: string;
  hotelAddress: string;
}

const GalleryTop: React.FC<GalleryTopProps> = ({ hotelImages, hotelTitle, hotelAddress }) => {
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  const handleSharePopupToggle = () => {
    setIsSharePopupOpen(!isSharePopupOpen);
  };

  const closeSharePopup = () => {
    setIsSharePopupOpen(false);
  };

  const handleCopyLink = async () => {
    const url = window.location.href; // Gets the current URL
    try {
      await navigator.clipboard.writeText(url); // Copies the URL to clipboard
      alert('Link copied to clipboard!'); // Optional: Show confirmation message
    } catch (err) {
      alert('Failed to copy the link'); // Error handling
    }
  };

  const [isSaved, setIsSaved] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('hotelSaved');
    if (savedState === 'true') {
      setIsSaved(true);
    }
  }, []);

  // Function to toggle the saved state
  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    localStorage.setItem('hotelSaved', newSavedState.toString()); // Persist state in localStorage
  };

  return (
    <div className="some-link p-4 flex justify-between items-center">
      {/* Back Link */}
      <a href="#" id="back-link" className="text-blue-600 hover:underline flex items-center gap-2">
        <FaArrowLeft />
        See all properties
      </a>

      {/* Hotel Title */}
      {/* <div className="text-xl font-semibold">{hotelTitle}</div> */}

      {/* Share and Save Links */}
      <div className="nav-links flex gap-6 ml-auto">
        <button className="share-open-popup" onClick={handleSharePopupToggle}>
          <a href="#" className="flex items-center gap-2">
            <FaShareAlt />
            <p>Share</p>
            
            </a>
        </button>
        <button
            id="save-button"
            className="flex items-center gap-2"
            onClick={handleSave}
            >
            <FaHeart
                id="heart-icon"
                className={`transition-colors ${isSaved ? 'text-red-500' : 'text-gray-500'}`}
            />
            <p>{isSaved ? 'Saved' : 'Save'}</p>
        </button>
      </div>

      {/* Share Popup */}
      {isSharePopupOpen && (
        <div id="share-popup" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="share-popup bg-white p-4 rounded-lg w-96">
            <div className="share-header flex justify-between items-center">
              <span className="font-semibold">Share</span>
              <button className="share-dismiss" onClick={closeSharePopup}>
                <IoClose size={24} />
              </button>
            </div>
            <div className="share-content mt-4">
              <div className="share-card flex gap-4">
              <img
                    src={`http://localhost:5000${hotelImages[0]}`}
                    alt="Location Image"
                    className="w-20 h-20 object-cover rounded"
                />
                <div className="share-info">
                  <h2 className="font-semibold">{hotelTitle}</h2>
                  <p>{hotelAddress}</p> {/* Hotel address */}
                  <p>9.8/10</p>
                </div>
              </div>
              <div className="share-options mt-4 grid grid-cols-2 gap-4">
                <button className="share-option flex items-center gap-2 p-2 border rounded w-full mb-2">
                  <FaComment /> Messages
                </button>
                <button className="share-option flex items-center gap-2 p-2 border rounded w-full mb-2">
                  <FaWhatsapp /> WhatsApp
                </button>
                <button className="share-option flex items-center gap-2 p-2 border rounded w-full mb-2">
                  <FaFacebookMessenger /> Messenger
                </button>
                <button className="share-option flex items-center gap-2 p-2 border rounded w-full mb-2">
                  <FaFacebook /> Facebook
                </button>
                <button className="share-option flex items-center gap-2 p-2 border rounded w-full mb-2">
                  <FaTwitter /> X
                </button>
                <button 
                    className="share-option flex items-center gap-2 p-2 border rounded w-full"
                    onClick={handleCopyLink}
                >
                  <FaLink /> Copy link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryTop;
