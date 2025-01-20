import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import farmReducer from "./farmSlice.js";
import weatherReducer from "./weatherSlice.jsx";
import satelliteReduce from "./satelliteSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    farm: farmReducer,
    weather: weatherReducer,
    satellite: satelliteReduce,
  },
});

export default store;
