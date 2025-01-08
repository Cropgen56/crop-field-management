import React, { useState, useRef } from "react";
import nvdiImage from "../../../assets/Images/farm-nvdi-image.png";
import {
  MapContainer,
  TileLayer,
  Polygon,
  ImageOverlay,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./FarmMap.css";
import CropDetailsTab from "../crop-details-tab/CropDetailsTab";

const FarmMap = () => {
  const [lat, setLat] = useState(20.1360471);
  const [lng, setLng] = useState(77.1360471);
  const mapRef = useRef(null);

  // Polygon coordinates
  const polygonCoordinates = [
    [20.137281704504993, 77.1363937854767],
    [20.136254256452098, 77.13630795478822],
    [20.136022576055755, 77.1376919746399],
    [20.13734214241536, 77.13800311088563],
  ];

  // Image overlay bounds
  const imageBounds = [
    [20.13734214241536, 77.13630795478822],
    [20.136022576055755, 77.13800311088563],
  ];

  // Handle map events (e.g., click)
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLat(lat);
        setLng(lng);
      },
    });
    return null;
  };

  return (
    <div className="farm-map">
      <MapContainer
        center={[lat, lng]}
        zoom={17}
        zoomControl={false}
        className="farm-map__map-container"
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          attribution="© Google Satellite"
          url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          maxZoom={50}
        />
        {/* Polygon boundary */}
        <Polygon
          pathOptions={{ fillColor: "green" }}
          positions={polygonCoordinates}
        />
        {/* Image overlay */}
        <ImageOverlay
          url={nvdiImage}
          bounds={imageBounds}
          opacity={1}
          className="farm-map__image-overlay"
        />
        <MapEvents />
      </MapContainer>
      <CropDetailsTab />
    </div>
  );
};

export default FarmMap;
