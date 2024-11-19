import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  hotelImages: string[];
  roomImages: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ hotelImages, roomImages }) => {
  const allImages = [...hotelImages, ...roomImages];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowAllImages(false);
  };

  const nextImage = () => {
    if (currentImageIndex < allImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (allImages.length === 0) {
    return <div className="text-gray-500">No images available</div>;
  }

  const renderGalleryLayout = () => {
    const galleryImages = allImages.slice(0, 5);

    switch (allImages.length) {
      case 1:
        return (
          <div className="w-full ">
            <img
              src={`http://localhost:5000${allImages[0]}`}
              alt="Single Image"
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => handleImageClick(0)}
            />
          </div>
        );
      
      case 2:
        return (
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000${image}`}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        );
      
      case 3:
        return (
          <div className="grid grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000${image}`}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        );
      
      case 4:
        return (
          <div className="grid grid-cols-2 gap-4 ">
            <img
              src={`http://localhost:5000${galleryImages[0]}`}
              alt="Main Image"
              className="row-span-2 w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => handleImageClick(0)}
            />
            <div className="grid grid-rows-2 gap-4">
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.slice(1, 3).map((image, index) => (
                  <img
                    key={index + 1}
                    src={`http://localhost:5000${image}`}
                    alt={`Gallery Image ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(index + 1)}
                  />
                ))}
              </div>
              <img
                src={`http://localhost:5000${galleryImages[3]}`}
                alt="Gallery Image 4"
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(3)}
              />
            </div>
          </div>
        );
      
      default: // 5 or more images
        return (
          <div className="grid grid-cols-2 gap-1 ">
            <img
              src={`http://localhost:5000${galleryImages[0]}`}
              alt="Main Image"
              className="row-span-2 w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => handleImageClick(0)}
            />
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              {galleryImages.slice(1, 5).map((image, index) => (
                <div key={index + 1} className="relative">
                  <img
                    src={`http://localhost:5000${image}`}
                    alt={`Gallery Image ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(index + 1)}
                  />
                  {index === 3 && allImages.length > 5 && (
                    <div
                      onClick={() => {
                        setShowAllImages(true);
                        setIsModalOpen(true);
                      }}
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded-lg cursor-pointer"
                    >
                      +{allImages.length - 5} more
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderGalleryLayout()}
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={closeModal}
          >
            <X size={24} />
          </button>
          
          <div className="relative max-w-4xl w-full mx-4">
            {showAllImages ? (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {allImages.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000${image}`}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg cursor-pointer"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowAllImages(false);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="relative">
                <img
                  src={`http://localhost:5000${allImages[currentImageIndex]}`}
                  alt={`Current Image ${currentImageIndex + 1}`}
                  className="max-h-[80vh] mx-auto rounded-lg"
                />
                
                <button
                  onClick={previousImage}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white 
                    ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75'}`}
                  disabled={currentImageIndex === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextImage}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white 
                    ${currentImageIndex === allImages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75'}`}
                  disabled={currentImageIndex === allImages.length - 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
