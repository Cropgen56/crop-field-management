import React from "react";
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

const WeatherCard = ({ weather }) => {
  // Extracting temperature and converting from Kelvin to Celsius, rounding to nearest whole number
  const temperatureCelsius = weather?.main?.temp
    ? Math.round(weather.main.temp - 273.15)
    : "N/A";

  // // Get the weather condition description
  const weatherCondition = weather?.weather?.[0]?.main?.toLowerCase();

  // Map weather conditions to custom icons
  const getWeatherIcon = () => {
    if (weatherCondition === "clear") return <SunIcon />;
    if (weatherCondition === "clouds") return <CloudsIcon />;
    if (weatherCondition === "rain") return <RainCloudeIcon />;
    if (weatherCondition === "snow") return <CloudsIcon />;
    return <SunIcon />;
  };

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
            <strong>
              {/* <SunIcon /> */}
              {getWeatherIcon()}
              {temperatureCelsius}
              <sup>°</sup>C
            </strong>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail">
            <WindIcon />
            <p>{weather?.wind?.speed || "N/A"} m/s</p>
            <small>Wind</small>
          </div>
          <div className="detail">
            <HumidityIcon />
            <p>{weather?.main?.humidity || "N/A"}%</p>
            <small>Humidity</small>
          </div>
          <div className="detail">
            <PressureIcon />
            <p>{weather?.main?.pressure || "N/A"} hPa</p>
            <small>Pressure</small>
          </div>
          <div className="detail">
            <PrecipitationIcon />
            <p>{weather?.precipitation || "0"} mm</p>
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
