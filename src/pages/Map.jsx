import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";

const SearchField = ({ onLocationSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      retainZoomLevel: false,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x, y, label } = result.location;
      onLocationSelect({ lat: y, lng: x, name: label });
      map.setView([y, x], 18); // Zoom level 18
    });

    return () => map.removeControl(searchControl);
  }, [map, onLocationSelect]);

  return null;
};

const CurrentLocationButton = ({ onLocationFound }) => {
  const map = useMap();

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current Location Coordinates:", latitude, longitude); // Debug log
          onLocationFound({
            lat: latitude,
            lng: longitude,
            name: "Your Current Location",
          });
          map.setView([latitude, longitude], 18); // Center map to current location
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to fetch your location. Please ensure location services are enabled."
          );
        },
        {
          enableHighAccuracy: true, // High accuracy mode
          timeout: 10000, // 10 seconds timeout
          maximumAge: 0, // Do not use cached location
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <button
      onClick={handleCurrentLocation}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        padding: "10px 15px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Current Location
    </button>
  );
};

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 20.1360471,
    lng: 77.1360471,
    name: "Default Location",
  });

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleLocationFound = (location) => {
    setSelectedLocation(location);
  };

  return (
    <MapContainer
      center={[selectedLocation.lat, selectedLocation.lng]}
      zoom={17}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        maxZoom={100}
        attribution="© Google Satellite"
      />

      <SearchField onLocationSelect={handleLocationSelect} />
      <CurrentLocationButton onLocationFound={handleLocationFound} />

      <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
        <Popup>{selectedLocation.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
// return (
//   <div className="search-bar">
//     <SearchIcon style={{ cursor: "pointer" }} onClick={handleSearchClick} />
//     <input
//       type="text"
//       placeholder="Search Location"
//       value={searchQuery}
//       onChange={handleSearchChange}
//       onKeyPress={handleSearchKeyPress}
//       className="search-input"
//     />
//     <MicIcon />
//     {isSearching && <div className="loading-spinner">Searching...</div>}
//   </div>
// );
