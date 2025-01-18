import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import farmReducer from "./farmSlice.js";
import satelliteReducer from "./satelliteSlice.js";
import weatherReducer from "./weatherSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
    farm: farmReducer,
    satellite: satelliteReducer,
    weather: weatherReducer,
  },
});

export default store;
