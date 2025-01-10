import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import farmSlice from "./farmSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    farm: farmSlice,
  },
});

export default store;
