import React, { useState, useRef, useEffect } from "react";
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

const FarmMap = ({ farmDetails }) => {
  const [lat, setLat] = useState(20.1360471);
  const [lng, setLng] = useState(77.1360471);
  const mapRef = useRef(null);

  const polygonCoordinates = farmDetails?.field || [];

  // Calculate the center of the polygon
  function calculatePolygonCentroid(coordinates) {
    let sumX = 0;
    let sumY = 0;
    let area = 0;

    const n = coordinates.length;

    for (let i = 0; i < n; i++) {
      const { lat: x1, lng: y1 } = coordinates[i];
      const { lat: x2, lng: y2 } = coordinates[(i + 1) % n];

      const crossProduct = x1 * y2 - x2 * y1;

      area += crossProduct;
      sumX += (x1 + x2) * crossProduct;
      sumY += (y1 + y2) * crossProduct;
    }

    area = area / 2;
    const centroidX = sumX / (6 * area);
    const centroidY = sumY / (6 * area);
    return { centroidLat: centroidX, centroidLng: centroidY };
  }

  // Use useEffect to calculate the centroid when farmDetails changes
  useEffect(() => {
    if (polygonCoordinates.length > 0) {
      const { centroidLat, centroidLng } =
        calculatePolygonCentroid(polygonCoordinates);
      setLat(centroidLat);
      setLng(centroidLng);
    }
  }, [polygonCoordinates]);

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
          positions={polygonCoordinates.map(({ lat, lng }) => [lat, lng])}
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
