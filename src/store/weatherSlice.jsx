import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const UNITS = "metric";

// Async thunk for fetching current weather data
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ city, state }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},IN&units=${UNITS}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch weather data"
      );
    }
  }
);

// Weather slice
const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: null,
    forecastData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch current weather
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherData = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default weatherSlice.reducer;
