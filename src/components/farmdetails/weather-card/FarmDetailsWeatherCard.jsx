import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading/Loading";
import "./FarmDetailsWeatherCard.css";
import {
  HumidityWhiteIcon,
  LocationWhite,
  PrecipitaionWhiteIcon,
  PrassureWhiteIcon,
  WindWhiteIcon,
} from "../../../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import WeekForecast from "../week-frocast/WeekForecast";
import { getCityState } from "../../../utils/getUserLocation";
import { getCurrentLocation } from "../../../utils/getUserCurrectCoordinate";
import { useTranslation } from "react-i18next";

const FarmDetailsWeatherCard = ({ farmDetails }) => {
  const { t } = useTranslation();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const dispatch = useDispatch();

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

  // Fetch the weather data
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    getCurrentLocation({
      setLocation: (loc) => {
        setLocation(loc);
        if (loc?.latitude && loc?.longitude) {
          getCityState({
            lat: loc.latitude,
            lng: loc.longitude,
            setCity,
            setState,
          });
        }
      },
    });
  }, []);

  const weather = JSON.parse(localStorage.getItem("weatherData"))
    .currentConditions || {
    temp: null,
    humidity: null,
    pressure: null,
    windspeed: null,
    precipitation: null,
  };

  // Convert Fahrenheit to Celsius
  function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  return (
    <div className="farm-details-weather-card">
      <div className="location-header">
        <div className="location">
          <LocationWhite />
          <span>{`${city}, ${state}`}</span>
        </div>
        <div className="last-updated">{t("lastUpdated")}</div>
      </div>
      <div className="main-info">
        <div className="temp">
          <strong>
            {Math.round(fahrenheitToCelsius(weather?.temp))}
            <span>°C</span>
          </strong>
        </div>
        <div className="condition">{t(weather?.conditions)}</div>
      </div>
      <div className="stats">
        <div className="stat">
          <div>
            <div className="label">{t("wind")}</div>
            <div className="value">{weather?.windspeed} m/s</div>
          </div>
          <div className="icon">
            <WindWhiteIcon />
          </div>
        </div>
        <div className="stat">
          <div>
            <div className="label">{t("humidity")}</div>
            <div className="value">{weather?.humidity}%</div>
          </div>
          <div className="icon">
            <HumidityWhiteIcon />
          </div>
        </div>
        <div className="stat">
          <div>
            <div className="label">{t("pressure")}</div>
            <div className="value">{weather?.pressure} hPa</div>
          </div>
          <div className="icon">
            <PrassureWhiteIcon />
          </div>
        </div>
        <div className="stat">
          <div>
            <div className="label">{t("precipitation")}</div>
            <div className="value">{weather?.precipprob}%</div>
          </div>
          <div className="icon">
            <PrecipitaionWhiteIcon />
          </div>
        </div>
      </div>
      <h5>{t("thisWeek")}</h5>
      <WeekForecast lat={lat} lon={lng} />
    </div>
  );
};

export default FarmDetailsWeatherCard;
