import axios from "axios";

// export const getWeatherData = async ({ location, setWeather }) => {
//   try {
//     const response = await axios.get(
//       "https://api.openweathermap.org/data/2.5/weather",
//       {
//         params: {
//           lat: location?.latitude,
//           lon: location?.longitude,
//           appid: process.env.REACT_APP_WEATHER_API_KEY,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error fetching weather data:",
//       error.response?.data || error
//     );
//   }
// };

export const getWeatherData = async ({ location }) => {
  try {
    // Constructing the API endpoint with proper query parameters
    const response = await axios.get(
      `https://api.agromonitoring.com/agro/1.0/weather`,
      {
        params: {
          lat: location?.latitude,
          lon: location?.longitude,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.response?.data || error.message || error
    );
  }
};
