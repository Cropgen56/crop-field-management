import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
  LayersControl,
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
} from "../../assets/Icons";
const { BaseLayer } = LayersControl;

const AddFieldMap = () => {
  const [markers, setMarkers] = useState([]);
  const [isAddingMarkers, setIsAddingMarkers] = useState(false);
  const mapRef = useRef();
  const navigate = useNavigate();

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

  return (
    <div className="map-layout add-field">
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
            <SearchIcon />
            <input type="text" placeholder="Search Location" />
            <MicIcon />
          </div>
        </div>

        <MapContainer
          center={[20.1360471, 77.157196]}
          zoom={17}
          zoomControl={false}
          className="map-container"
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
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
            {/* Yellow icon for adding markers */}
            <CurrentLocationIcon />
          </button>
        </div>
        <div className="create-farm-container">
          <button onClick={() => setIsAddingMarkers(!isAddingMarkers)}>
            Create Farm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFieldMap;
