import React, { useState, useEffect } from "react";
import "./WeekForecast.css";

const WeekForecast = ({ lat, lon }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "90f5701f849c1f746ddcaac6137727f7";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();

        // Group by days
        const dailyData = data.list.reduce((acc, item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!acc[date]) {
            acc[date] = {
              date,
              temp: item.main.temp,
              weather: item.weather[0],
              precipitation: item.pop * 100,
            };
          }
          return acc;
        }, {});

        setForecast(Object.values(dailyData).slice(0, 7));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="forecast-week">
      {error && <div>Error: {error}</div>}
      {!error && forecast.length === 0 && <div>Loading...</div>}
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div
            className={`forecast-day ${
              day.date === getCurrentDate() ? "current-day" : ""
            }`}
            key={index}
          >
            <div className="day-name">
              {new Date(day.date)
                .toLocaleDateString("en-US", { weekday: "short" })
                .toUpperCase()}
            </div>
            <div className="icon-wrapper">
              <img
                src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
              />
              <div
                className={`temp ${
                  day.date === getCurrentDate() ? "current-day-temp" : ""
                }`}
              >
                {day.temp.toFixed(2)}°C
              </div>
            </div>
            <div className="precipitation">{day.precipitation.toFixed(0)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekForecast;
