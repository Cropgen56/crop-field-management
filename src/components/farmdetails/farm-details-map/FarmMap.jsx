import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
import { removeIndexData } from "../../../store/satelliteSlice";
import { useDispatch } from "react-redux";

const FarmMap = ({ farmDetails }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const polygonCoordinates = farmDetails?.field || [];

  useEffect(() => {
    dispatch(removeIndexData());
  }, []);
  const vagitationIndex = useSelector((state) => state.satellite.selectedIndex);
  const { indexData, isLoading } = useSelector((state) => state.satellite);

  // Sync selectedIndex with Redux state
  const [selectedIndex, setSelectedIndex] = useState(vagitationIndex);
  useEffect(() => {
    setSelectedIndex(vagitationIndex);
  }, [vagitationIndex]);

  // Fetch satellite image from Redux state
  useEffect(() => {
    if (indexData?.result?.dense_index_image) {
      setImage(`data:image/png;base64,${indexData.result.dense_index_image}`);
    } else {
      setImage(null);
    }
  }, [indexData]);

  // Calculate centroid using useMemo to avoid recalculations
  const polygonCentroid = useMemo(() => {
    if (polygonCoordinates.length < 3) return { lat: null, lng: null };

    let sumX = 0,
      sumY = 0,
      area = 0;
    polygonCoordinates.forEach((current, i) => {
      const next = polygonCoordinates[(i + 1) % polygonCoordinates.length];
      const crossProduct = current.lat * next.lng - next.lat * current.lng;
      area += crossProduct;
      sumX += (current.lat + next.lat) * crossProduct;
      sumY += (current.lng + next.lng) * crossProduct;
    });

    area = area / 2;
    return area !== 0
      ? { lat: sumX / (6 * area), lng: sumY / (6 * area) }
      : { lat: null, lng: null };
  }, [polygonCoordinates]);

  // Calculate polygon bounds using useMemo
  const polygonBounds = useMemo(() => {
    if (polygonCoordinates.length === 0) return null;

    const lats = polygonCoordinates.map(({ lat }) => lat);
    const lngs = polygonCoordinates.map(({ lng }) => lng);

    return [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ];
  }, [polygonCoordinates]);

  // Set map center when polygon changes
  useEffect(() => {
    if (polygonCentroid.lat !== null && polygonCentroid.lng !== null) {
      setLat(polygonCentroid.lat);
      setLng(polygonCentroid.lng);
    }
  }, [polygonCentroid]);

  // Map click event handler
  const MapEvents = () => {
    useMapEvents({
      click: useCallback((e) => {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      }, []),
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
          {isLoading?.index && (
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
              bounds={polygonBounds}
              opacity={1}
              interactive={true}
            />
          )}
          <MapEvents />
        </MapContainer>
      ) : (
        <div>Loading Map...</div>
      )}
      <CropDetailsTab farmDetails={farmDetails} selectedIndex={selectedIndex} />
    </div>
  );
};

export default FarmMap;
