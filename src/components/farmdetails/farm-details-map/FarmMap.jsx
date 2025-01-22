import React, { useState, useRef, useEffect } from "react";
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
import { useSelector } from "react-redux";
import Loading from "../../common/Loading/Loading";

const FarmMap = ({ farmDetails }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [polygonBounds, setPolygonBounds] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const vagitationIndex = useSelector((state) => state.satellite.selectedIndex);

  const mapRef = useRef(null);
  const polygonCoordinates = farmDetails?.field || [];

  // Utility function to safely parse JSON
  const parseJSON = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Invalid JSON data:", data, error);
      return null;
    }
  };

  // Sync selectedIndex with vagitationIndex from Redux
  useEffect(() => {
    setSelectedIndex(vagitationIndex);
  }, [vagitationIndex]);

  // Load image based on selectedIndex
  useEffect(() => {
    if (!selectedIndex) {
      setImage(null);
      return;
    }

    const dataKey =
      selectedIndex === "soc"
        ? "socData"
        : selectedIndex === "ndvi"
        ? "ndviData"
        : null;
    if (dataKey) {
      const rawData = localStorage.getItem(dataKey);
      const parsedData = parseJSON(rawData);
      const base64_image =
        selectedIndex === "soc"
          ? parsedData?.base64_image
          : parsedData?.dense_ndvi_image;

      setImage(base64_image ? `data:image/png;base64,${base64_image}` : null);
    } else {
      setImage(null);
    }
  }, [selectedIndex]);

  // Calculate polygon centroid
  const calculatePolygonCentroid = (coordinates) => {
    if (coordinates.length < 3) return { centroidLat: null, centroidLng: null };

    let sumX = 0;
    let sumY = 0;
    let area = 0;

    coordinates.forEach((current, i) => {
      const next = coordinates[(i + 1) % coordinates.length];
      const crossProduct = current.lat * next.lng - next.lat * current.lng;
      area += crossProduct;
      sumX += (current.lat + next.lat) * crossProduct;
      sumY += (current.lng + next.lng) * crossProduct;
    });

    area /= 2;
    return {
      centroidLat: sumX / (6 * area),
      centroidLng: sumY / (6 * area),
    };
  };

  // Calculate polygon bounds
  const calculatePolygonBounds = (coordinates) => {
    if (coordinates.length === 0) return null;

    const lats = coordinates.map(({ lat }) => lat);
    const lngs = coordinates.map(({ lng }) => lng);

    const southWest = [Math.min(...lats), Math.min(...lngs)];
    const northEast = [Math.max(...lats), Math.max(...lngs)];

    return [southWest, northEast];
  };

  // Set map centroid and bounds when polygonCoordinates change
  useEffect(() => {
    if (polygonCoordinates.length > 0) {
      const { centroidLat, centroidLng } =
        calculatePolygonCentroid(polygonCoordinates);
      setLat(centroidLat);
      setLng(centroidLng);
      setPolygonBounds(calculatePolygonBounds(polygonCoordinates));
    }
  }, [polygonCoordinates]);

  // Handle map events
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div className="farm-map">
      {lat !== null && lng !== null ? (
        <MapContainer
          center={[lat, lng]}
          zoom={17}
          zoomControl={false}
          className="farm-map__map-container"
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          {loading && (
            <div className="farm-map__spinner-overlay">
              <Loading />
            </div>
          )}
          <TileLayer
            attribution="© Google Maps"
            url="http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            maxZoom={50}
          />
          <Polygon
            pathOptions={{ fillColor: "transparent", fillOpacity: 0 }}
            positions={polygonCoordinates.map(({ lat, lng }) => [lat, lng])}
          />
          {polygonBounds && image && (
            <ImageOverlay
              url={image}
              bounds={[
                [20.134146869464864, 77.13503170361948],
                [20.135688059795093, 77.13686633458565],
              ]}
              opacity={1}
              interactive={true}
            />
          )}
          <MapEvents />
        </MapContainer>
      ) : (
        <div>Loading Map...</div>
      )}
      <CropDetailsTab
        farmDetails={farmDetails}
        setLoading={setLoading}
        selectedIndex={selectedIndex}
      />
    </div>
  );
};

export default FarmMap;
