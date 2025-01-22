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
  AddFieldIcon,
  BackButtonIcon,
  CurrentLocationIcon,
  DeleteFieldIcon,
  LeftArrowIcon,
  PenIcon,
  SaveIcon,
} from "../../../assets/Icons";
import AddFieldDetails from "../addfielddetails/AddFieldDetails";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "./AddFieldMap.css";

const AddFieldMap = ({ setIsSubmitting }) => {
  const [markers, setMarkers] = useState([]);
  const [isAddingMarkers, setIsAddingMarkers] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 20.1360471,
    lng: 77.1360471,
    name: "Default Location",
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState("");

  const yellowMarkerIcon = new L.divIcon({
    className: "yellow-marker",
    html: '<div style="background-color: yellow; border-radius: 50%; width: 15px; height: 15px; border: 1px solid #ffcc00;"></div>',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
  });

  // toggle form to add farm details
  const toggleForm = () => {
    if (markers.length >= 3) {
      setIsOpen(!isOpen);
    } else {
      alert("Please complete the field first!");
    }
  };

  const clearMarkers = () => setMarkers([]);

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

  // remove the last marks
  const removeLastMarker = () => {
    setMarkers((currentMarkers) => {
      if (currentMarkers.length === 0) {
        alert("No markers left to remove.");
        return currentMarkers;
      }
      return currentMarkers.slice(0, -1);
    });
  };

  // get the currenct location
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
          () => alert("Unable to fetch your location."),
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
          top: "65vh",
          right: "16px",
          zIndex: 1000,
          padding: "14px 14px",
          backgroundColor: "#075a53",
          color: "#fff",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
        }}
        className={selectedIcon == "current-location" ? "selected-icon" : ""}
        onClick={() => {
          handleCurrentLocation();
          setSelectedIcon("current-location");
        }}
      >
        <CurrentLocationIcon />
      </button>
    );
  };

  // search the location
  const SearchField = ({ onLocationSelect }) => {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: true,
        retainZoomLevel: false,
        autoComplete: true,
      });

      map.addControl(searchControl);

      map.on("geosearch/showlocation", (result) => {
        const { x, y, label } = result.location;
        onLocationSelect({ lat: y, lng: x, name: label });
        map.setView([y, x], 18);
      });

      return () => {
        map.removeControl(searchControl);
      };
    }, [map, onLocationSelect]);

    return (
      <div className="search-field-container">
        {/* Search control is added by leaflet-geosearch */}
      </div>
    );
  };

  return (
    <div className="map-layout add-field">
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
          attribution="© Google Maps"
          url="http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
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
        <div className="search-field-container">
          {" "}
          <SearchField onLocationSelect={setSelectedLocation} />
        </div>

        <CurrentLocationButton onLocationFound={setSelectedLocation} />
      </MapContainer>
      <div className="map-controls">
        <button
          onClick={() => {
            setSelectedIcon("back-button");
            if (markers.length === 0) {
              alert("No markers left to remove.");
            } else {
              removeLastMarker();
            }
          }}
          className={selectedIcon == "back-button" ? "selected-icon" : ""}
        >
          <BackButtonIcon />
        </button>
        <button
          onClick={() => {
            setIsAddingMarkers(!isAddingMarkers);
            setSelectedIcon("add-mark");
          }}
          className={selectedIcon == "add-mark" ? "selected-icon" : ""}
        >
          <AddFieldIcon />
        </button>
        <button
          onClick={() => {
            toggleForm();
            setSelectedIcon("save");
          }}
          className={selectedIcon == "save" ? "selected-icon" : ""}
        >
          <SaveIcon />
        </button>
        <button
          onClick={() => {
            clearMarkers();
            setSelectedIcon("remove");
          }}
          className={selectedIcon == "remove" ? "selected-icon" : ""}
        >
          <DeleteFieldIcon />
        </button>
      </div>

      <AddFieldDetails
        isOpen={isOpen}
        toggleForm={toggleForm}
        fieldCoordinate={markers}
        setIsSubmitting={setIsSubmitting}
      />
    </div>
  );
};

export default AddFieldMap;
