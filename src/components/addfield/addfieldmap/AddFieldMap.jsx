import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./AddFieldMap.css";
import {
  CurrentLocationIcon,
  LeftArrowIcon,
  MicIcon,
  PenIcon,
  SearchIcon,
} from "../../../assets/Icons";
import AddFieldDetails from "../addfielddetails/AddFieldDetails";

const AddFieldMap = () => {
  const [markers, setMarkers] = useState([]);
  const [isAddingMarkers, setIsAddingMarkers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [lat, setLat] = useState(20.1360471);
  const [lng, setLng] = useState(77.1360471);
  const [isMapReady, setIsMapReady] = useState(false);

  // Toggle form visibility
  const [isOpen, setIsOpen] = useState(false);

  // Handle form toggle
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  console.log(markers);
  // Create a custom yellow marker icon using divIcon
  const yellowMarkerIcon = new L.divIcon({
    className: "yellow-marker",
    html: '<div style="background-color: yellow; border-radius: 50%; width: 15px; height: 15px; border: 1px solid #ffcc00;"></div>',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
  });

  const Markers = () => {
    useMapEvents({
      click: (e) => {
        if (isAddingMarkers) {
          const { lat, lng } = e.latlng;
          setMarkers((currentMarkers) => {
            const newMarkers = [...currentMarkers, { lat, lng }];
            return newMarkers.length > 12 ? newMarkers.slice(-12) : newMarkers;
          });
        }
      },
    });
    return null;
  };

  const clearMarkers = () => setMarkers([]);

  // Function to fly to the location after the map is loaded
  const flyToLocation = (latitude, longitude) => {
    if (mapRef.current && isMapReady) {
      mapRef.current.flyTo([latitude, longitude], 17);
    } else {
      console.error("Map instance is not initialized yet. Retrying...");
      setTimeout(() => flyToLocation(latitude, longitude), 100); // Retry after 100ms
    }
  };

  // Function to get the user's current location
  const goToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          setLat(latitude);
          setLng(longitude);
          flyToLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert(
            "Could not get your current location. Please enable location access."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        console.log(latitude, longitude);

        // Fly to location only if map is ready
        if (isMapReady) {
          flyToLocation(latitude, longitude);
        } else {
          console.error("Map not initialized yet, retrying...");
          setTimeout(() => flyToLocation(latitude, longitude), 100); // Retry after 100ms
        }

        // Optionally, add a marker
        setMarkers((currentMarkers) => [
          ...currentMarkers,
          { lat: latitude, lng: longitude, name: display_name },
        ]);
      } else {
        alert("Location not found. Try another search.");
      }
    } catch (error) {
      console.error("Error searching for location:", error);
    }
  };

  // Set the map as ready when the map instance is created
  const onMapCreate = (mapInstance) => {
    mapRef.current = mapInstance;
    setIsMapReady(true);
  };

  // show the video card
  const [showCard, setShowCard] = useState(false);

  const handleClose = () => {
    setShowCard(false);
  };

  return (
    <div className="map-layout add-field">
      {/* show the card to the user  */}
      {showCard && (
        <div className="video-overlay">
          <div className="video-card">
            <video controls autoPlay className="video-content">
              <source src="your-video-url.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="close-button" onClick={handleClose}>
              ✕
            </button>
          </div>
        </div>
      )}
      {/* main content of the page */}
      <div className="map-content">
        <div className="map-header">
          <div
            className="back-btn"
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftArrowIcon />
          </div>
          <div className="search-bar">
            <SearchIcon
              onClick={searchLocation}
              style={{ cursor: "pointer" }}
            />
            <input
              type="text"
              placeholder="Search Location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchLocation()}
            />
            <MicIcon />
          </div>
        </div>

        <MapContainer
          center={[lat, lng]}
          zoom={17}
          zoomControl={false}
          className="map-container"
          whenCreated={onMapCreate}
        >
          <TileLayer
            attribution="© Google Satellite"
            url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            maxZoom={50}
          />

          {markers.map((marker, idx) => (
            <Marker
              key={idx}
              position={[marker.lat, marker.lng]}
              icon={yellowMarkerIcon}
            >
              <Popup>
                Marker at [{marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}]
              </Popup>
            </Marker>
          ))}

          {markers.length > 0 && (
            <Polygon
              positions={markers.map((marker) => [marker.lat, marker.lng])}
              color="yellow"
            />
          )}
          <Markers />
        </MapContainer>

        <div className="map-controls">
          <button onClick={clearMarkers}>
            <PenIcon />
          </button>
          <button className="add-markers-btn">
            <CurrentLocationIcon />
          </button>
        </div>
        <div className="create-farm-container">
          <button
            onClick={() => {
              setIsAddingMarkers(!isAddingMarkers);
            }}
          >
            {isAddingMarkers ? "Stop Markers" : "Add Markers"}
          </button>
          {/* Button to go to current location */}
          <button
            onClick={() => {
              toggleForm(!isOpen);
            }}
          >
            Save Field
          </button>
        </div>
        <AddFieldDetails isOpen={isOpen} toggleForm={toggleForm} />
      </div>
    </div>
  );
};

export default AddFieldMap;
