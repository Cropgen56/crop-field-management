import React from "react";
import "./WeatherCard.css";

const WeatherCard = () => {
  return (
    <div className="weather-card">
      <div className="weather-stats">
        <p>Wind</p>
        <p>Humidity</p>
        <p>Pressure</p>
        <p>Precipitation</p>
      </div>
      <div className="sun-info">
        <p>5:30 AM</p>
        <div className="sun-path">
          <img src="/sun-path.png" alt="Sun Path" />
        </div>
        <p>6:30 PM</p>
      </div>
    </div>
  );
};

export default WeatherCard;
