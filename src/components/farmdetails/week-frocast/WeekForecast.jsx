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

  // genrate icon on the basis of the cloud
  const getWeatherIcon = (temperature, condition) => {
    if (condition?.toLowerCase()?.includes("rain")) return "🌧️";
    if (condition?.toLowerCase()?.includes("snow")) return "❄️";
    if (condition?.toLowerCase()?.includes("storm")) return "⛈️";
    if (
      condition?.toLowerCase()?.includes("clear") ||
      condition?.toLowerCase()?.includes("sunny")
    )
      return "☀️";
    if (condition?.toLowerCase()?.includes("cloud")) return "☁️";
    if (condition?.toLowerCase()?.includes("fog")) return "🌫️";

    if (temperature >= 35) return "🔥";
    if (temperature >= 25) return "☀️";
    if (temperature >= 15) return "⛅";
    if (temperature >= 5) return "🌥️";
    if (temperature >= -5) return "❄️";
    return "🧊";
  };

  return (
    <div className="forecast-week">
      {weatherData?.length === 0 && <div>Loading...</div>}

      <div className="forecast-container">
        {weatherData?.map((day, index) => (
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
              <span className="day-icon">
                {getWeatherIcon(
                  Math.round(fahrenheitToCelsius(day?.temp)),
                  day?.description
                )}
              </span>
              <span
                className={`temp ${
                  day.datetime === getCurrentDate() ? "current-day-temp" : ""
                }`}
              >
                {Math.round(fahrenheitToCelsius(day?.temp))}°C
              </span>
            </div>
            <div className="precipitation">{day?.precipprob || 0}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekForecast;
