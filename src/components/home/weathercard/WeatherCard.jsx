import React, { useState, useEffect } from "react";
import "./WeatherCard.css";
import {
  LocationIcon,
  RainCloudeIcon,
  WindIcon,
  HumidityIcon,
  PressureIcon,
  PrecipitationIcon,
  SunIcon,
} from "../../../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentLocation } from "../../../utils/getUserCurrectCoordinate";
import { getCityState } from "../../../utils/getUserLocation";
import { fetchweatherData } from "../../../store/weatherSlice";

const WeatherCard = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const dispatch = useDispatch();

  const weather = JSON.parse(localStorage.getItem("weatherData"))
    ?.currentConditions || {
    temp: null,
    humidity: null,
    pressure: null,
    windspeed: null,
    precipitation: null,
  };

  const updateWeatherData = () => {
    if (location) {
      const { latitude, longitude } = location;
      dispatch(fetchweatherData({ latitude, longitude })).then((action) => {
        if (action.payload) {
          localStorage.setItem("weatherData", JSON.stringify(action.payload));
          localStorage.setItem("lastFetchTime", Date.now());
        }
      });
    }
  };

  useEffect(() => {
    // Fetch user's current location and update city/state
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

  useEffect(() => {
    const storedFetchTime = localStorage.getItem("lastFetchTime");
    const currentTime = Date.now();

    // Check if 3 hours have passed since the last fetch
    if (
      !storedFetchTime ||
      currentTime - parseInt(storedFetchTime, 10) > 3 * 60 * 60 * 1000
    ) {
      updateWeatherData();
    } else {
      setLastFetchTime(storedFetchTime);
    }
  }, [location, dispatch]);

  // Convert Fahrenheit to Celsius
  function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  return (
    <div className="weather-card-container">
      <div className="weather-card">
        <div className="location-container">
          <div className="location">
            <h5>
              <LocationIcon /> {city || "Unknown City"},{" "}
              {state || "Unknown State"}
            </h5>
            <p>Weather's Today</p>
          </div>
          <div className="temperature">
            <SunIcon />
            <strong>
              {Math.round(fahrenheitToCelsius(weather?.temp)) || 30}
              <sup>°</sup>C
            </strong>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail">
            <WindIcon />
            <p>{weather?.windspeed || "N/A"} m/s</p>
            <small>Wind</small>
          </div>
          <div className="detail">
            <HumidityIcon />
            <p>{weather?.humidity || "N/A"}%</p>
            <small>Humidity</small>
          </div>
          <div className="detail">
            <PressureIcon />
            <p>{weather?.pressure || "N/A"} hPa</p>
            <small>Pressure</small>
          </div>
          <div className="detail">
            <PrecipitationIcon />
            <p>{weather?.precipprob || "0"} mm</p>
            <small>Precipitation</small>
          </div>
        </div>
        <div className="sun-timing">
          <div>
            <p>5:30 AM</p>
            <small>Sun Rise</small>
          </div>
          <div>
            <p>6:30 PM</p>
            <small>Sun Set</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
