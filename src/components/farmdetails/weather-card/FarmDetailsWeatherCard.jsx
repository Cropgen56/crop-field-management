import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading/Loading";
import "./FarmDetailsWeatherCard.css";
import {
  HumidityWhiteIcon,
  LocationWhite,
  PrecipitaionWhiteIcon,
  PrassureWhiteIcon,
  WindWhiteIcon,
  SunIcon,
} from "../../../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../../store/weatherSlice";
import WeekForecast from "../week-frocast/WeekForecast";

const CITY = "Pune";
const STATE = "Maharashtra";

const FarmDetailsWeatherCard = ({ farmDetails }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const polygonCoordinates = farmDetails?.field || [];

  // Calculate the centroid of the polygon
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

  useEffect(() => {
    if (polygonCoordinates.length > 0) {
      const { centroidLat, centroidLng } =
        calculatePolygonCentroid(polygonCoordinates);
      setLat(centroidLat);
      setLng(centroidLng);
    }
  }, [polygonCoordinates]);

  const dispatch = useDispatch();
  const { weatherData, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;

  if (!weatherData) {
    return <div>No weather data available.</div>;
  }

  const {
    main: { temp, humidity, pressure },
    wind: { speed },
    weather,
  } = weatherData;

  const condition = weather[0]?.description || "Unknown";
  const iconCode = weather[0]?.icon;

  return (
    <div className="farm-details-weather-card">
      <div className="location-header">
        <div className="location">
          <LocationWhite />
          <span>{`${CITY}, ${STATE}`}</span>
        </div>
        <div className="last-updated">Just now</div>
      </div>
      <div className="main-info">
        <div className="temp">
          {iconCode && (
            <img
              src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
              alt="weather icon"
            />
          )}
          <strong>
            {Math.round(temp)}
            <span>°C</span>
          </strong>
        </div>
        <div className="condition">{condition}</div>
      </div>
      <div className="stats">
        <div className="stat">
          <div>
            <div className="label">Wind</div>
            <div className="value">{speed} m/s</div>
          </div>
          <div className="icon">
            <WindWhiteIcon />
          </div>
        </div>
        <div className="stat">
          <div>
            <div className="label">Humidity</div>
            <div className="value">{humidity}%</div>
          </div>
          <div className="icon">
            <HumidityWhiteIcon />
          </div>
        </div>
        <div className="stat">
          <div>
            <div className="label">Pressure</div>
            <div className="value">{pressure} hPa</div>
          </div>
          <div className="icon">
            <PrassureWhiteIcon />
          </div>
        </div>
        <div className="stat">
          <div>
            <div className="label">Precipitin</div>
            <div className="value">0 mm</div>
          </div>

          <div className="icon">
            <PrecipitaionWhiteIcon />
          </div>
        </div>
      </div>
      <h5>This Week</h5>
      {/* Placeholder weekly forecast */}
      <WeekForecast lat={lat} lon={lng} />
    </div>
  );
};

export default FarmDetailsWeatherCard;
