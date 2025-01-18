import React, { useState } from "react";
import "./WeatherCard.css";
import {
  LocationIcon,
  RainCloudeIcon,
  WindIcon,
  HumidityIcon,
  PressureIcon,
  PrecipitationIcon,
  CloudsIcon,
  SunIcon,
} from "../../../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../../store/weatherSlice";
import { useEffect } from "react";
// import { getCurrentLocation } from "../../../utils/getUserCurrectCoordinate";
// import { getCityState } from "../../../utils/getUserLocation";
const WeatherCard = () => {
  // const [location, setLocation] = useState();
  // const [city, setCity] = useState();
  // const [state, setState] = useState();

  // useEffect(() => {
  //   // Fetch user's current location
  //   getCurrentLocation({ setLocation });
  //   // Run when location updates
  //   if (location) {
  //     const { latitude, longitude } = location;

  //     if (latitude && longitude) {
  //       getCityState(latitude, longitude)
  //         .then(({ city, state }) => {
  //           console.log("called");

  //           setCity(city);
  //           setState(state);
  //           console.log("City:", city, "State:", state);
  //         })
  //         .catch((err) => console.error("Error fetching city/state:", err));
  //     }
  //   }
  // }, []);

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
    <div className="weather-card-container">
      <div className="weather-card">
        <div className="location-container">
          <div className="location">
            <h5>
              <LocationIcon /> Pune, Maharashtra
            </h5>
            <p>Weather's Today</p>
          </div>
          <div className="temperature">
            <SunIcon />
            <strong>
              {Math.round(temp)}
              <sup>°</sup>C
            </strong>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail">
            <WindIcon />
            <p>{speed || "N/A"} m/s</p>
            <small>Wind</small>
          </div>
          <div className="detail">
            <HumidityIcon />
            <p>{humidity || "N/A"}%</p>
            <small>Humidity</small>
          </div>
          <div className="detail">
            <PressureIcon />
            <p>{pressure || "N/A"} hPa</p>
            <small>Pressure</small>
          </div>
          <div className="detail">
            <PrecipitationIcon />
            <p>{11 || "0"} mm</p>
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
