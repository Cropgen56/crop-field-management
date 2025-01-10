import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  CurrentLocationIcon,
  LeftArrowIcon,
  MicIcon,
  PenIcon,
  SearchIcon,
} from "../../../assets/Icons";
import AddFieldDetails from "../addfielddetails/AddFieldDetails";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "./AddFieldMap.css";

const AddFieldMap = () => {
  const [markers, setMarkers] = useState([]);
  const [isAddingMarkers, setIsAddingMarkers] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 20.1360471,
    lng: 77.1360471,
    name: "Default Location",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const toggleForm = () =>
    setIsOpen(
      markers.length >= 3 ? !isOpen : alert("Please complete the field first !")
    );
  const clearMarkers = () => setMarkers([]);

  const yellowMarkerIcon = new L.divIcon({
    className: "yellow-marker",
    html: '<div style="background-color: yellow; border-radius: 50%; width: 15px; height: 15px; border: 1px solid #ffcc00;"></div>',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
  });

  const checkCoordinate = () => {
    if (markers.length >= 3) {
      return true;
    }
    return false;
  };

  const Markers = () => {
    useMapEvents({
      click: (e) => {
        if (isAddingMarkers) {
          const { lat, lng } = e.latlng;
          setMarkers((currentMarkers) =>
            currentMarkers.length > 12
              ? [...currentMarkers.slice(1), { lat, lng }]
              : [...currentMarkers, { lat, lng }]
          );
        }
      },
    });
    return null;
  };

  // get the current location of the user
  const CurrentLocationButton = ({ onLocationFound }) => {
    const map = useMap();
    const handleCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            onLocationFound({
              lat: latitude,
              lng: longitude,
              name: "Your Current Location",
            });
            map.setView([latitude, longitude], 18);
          },
          (error) => alert("Unable to fetch your location."),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        alert("Geolocation not supported.");
      }
    };
    return (
      <button
        style={{
          position: "absolute",
          top: "80vh",
          right: "10px",
          zIndex: 1000,
          padding: "15px 15px",
          backgroundColor: "#075a53",
          color: "#fff",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
        }}
        onClick={handleCurrentLocation}
      >
        <CurrentLocationIcon />
      </button>
    );
  };

  // Define the SearchField component
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

      // Add search control to map
      map.addControl(searchControl);

      map.on("geosearch/showlocation", (result) => {
        const { x, y, label } = result.location;
        onLocationSelect({ lat: y, lng: x, name: label });
        map.setView([y, x], 18);
      });

      return () => {
        map.removeControl(searchControl); // Cleanup on unmount
      };
    }, [map, onLocationSelect]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

    const handleSearchKeyPress = (e) => {
      if (e.key === "Enter" && searchQuery.trim()) {
        const provider = new OpenStreetMapProvider();
        provider.search(searchQuery).then((results) => {
          if (results.length > 0) {
            const { x, y, label } = results[0].location;
            onLocationSelect({ lat: y, lng: x, name: label });
            map.setView([y, x], 18);
          }
        });
      }
    };

    const handleSearchClick = () => {
      if (searchQuery.trim()) {
        const provider = new OpenStreetMapProvider();
        provider.search(searchQuery).then((results) => {
          if (results.length > 0) {
            const { x, y, label } = results[0].location;
            onLocationSelect({ lat: y, lng: x, name: label });
            map.setView([y, x], 18);
          }
        });
      }
    };
  };

  // save field

  return (
    <div className="map-layout add-field">
      {showCard && (
        <div className="video-overlay">
          <div className="video-card">
            <video controls autoPlay className="video-content">
              <source src="your-video-url.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="close-button" onClick={() => setShowCard(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="map-content">
        <div className="map-header">
          <div className="back-btn" onClick={() => navigate(-1)}>
            <LeftArrowIcon />
          </div>
        </div>

        <MapContainer
          center={[selectedLocation.lat, selectedLocation.lng]}
          zoom={17}
          zoomControl={false}
          className="map-container"
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
          <SearchField onLocationSelect={setSelectedLocation} />
          <CurrentLocationButton onLocationFound={setSelectedLocation} />
        </MapContainer>

        <div className="map-controls">
          <button onClick={clearMarkers}>
            <PenIcon />
          </button>
        </div>

        <div className="create-farm-container">
          <button onClick={() => setIsAddingMarkers(!isAddingMarkers)}>
            {isAddingMarkers ? "Stop Markers" : "Add Markers"}
          </button>
          <button onClick={toggleForm}>Save Field</button>
        </div>

        <AddFieldDetails
          isOpen={isOpen}
          toggleForm={toggleForm}
          fieldCoordinate={markers}
        />
      </div>
    </div>
  );
};

export default AddFieldMap;
