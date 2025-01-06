import React from "react";
import "./WeatherCard.css";
import {
  LocationIcon,
  RainCloudeIcon,
  WindIcon,
  HumidityIcon,
  PressureIcon,
  PrecipitationIcon,
} from "../../../assets/Icons";

const WeatherCard = () => {
  return (
    <div className="weather-card-container">
      {" "}
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
              <RainCloudeIcon />
              27<sup>°</sup>C
            </strong>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail">
            <WindIcon />
            <p>6 m/s</p>
            <small>Wind</small>
          </div>
          <div className="detail">
            <HumidityIcon />
            <p>86%</p>
            <small>Humidity</small>
          </div>
          <div className="detail">
            <PressureIcon />
            <p>1007 hPa</p>
            <small>Pressure</small>
          </div>
          <div className="detail">
            <PrecipitationIcon />
            <p>0 mm</p>
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
