import React from "react";
import "./WeekForecast.css";

const WeekForecast = () => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  const weatherData = JSON.parse(localStorage.getItem("weatherData")).days;

  return (
    <div className="forecast-week">
      {weatherData.length === 0 && <div>Loading...</div>}

      <div className="forecast-container">
        {weatherData.map((day, index) => (
          <div
            className={`forecast-day ${
              day.datetime === getCurrentDate() ? "current-day" : ""
            }`}
            key={index}
          >
            <div className="day-name">
              {new Date(day.datetime)
                .toLocaleDateString("en-US", { weekday: "short" })
                .toUpperCase()}
            </div>
            <div className="icon-wrapper">
              {/* <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
              /> */}
              <div
                className={`temp ${
                  day.datetime === getCurrentDate() ? "current-day-temp" : ""
                }`}
              >
                {Math.round(fahrenheitToCelsius(day?.temp))}°C
              </div>
            </div>
            <div className="precipitation">{day.precipprob || 0}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekForecast;
