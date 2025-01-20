import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIndex: null,
};

const satelliteSlice = createSlice({
  name: "satellite",
  initialState,
  reducers: {
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { setSelectedIndex, decrement, reset } = satelliteSlice.actions;

export default satelliteSlice.reducer;
