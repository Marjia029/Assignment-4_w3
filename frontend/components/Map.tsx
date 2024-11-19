import React from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  locationName: string;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, locationName }) => {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13308.857847720037!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5400b2d5798e009d%3A0x4ed51c64d3f1b4e5!2s${locationName}!5e0!3m2!1sen!2sus!4v1618600185661!5m2!1sen!2sus`;

  return (
    <div className="map-container space-y-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Explore the area</h2>
      <div className="map-image">
        <iframe
          src={mapSrc}
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
        <div className="map-image-text">
          <h4><b>{locationName}</b></h4>
          <p><a href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">View in map</a></p>
        </div>
      </div>
    </div>
  );
};

export default Map;
