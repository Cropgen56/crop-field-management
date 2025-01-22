import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  selectedIndex: "NDVI",
  datesData: null,
  indexData: null,
  loading: false,
  error: null,
};

// Async thunk for fetching dates and true color data
export const fetchDatesData = createAsyncThunk(
  "satellite/fetchDatesData",
  async (geometry, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SATELLITE}get-dates`,
        {
          geometry,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for fetching vegetation index data
export const fetchIndexData = createAsyncThunk(
  "satellite/fetchIndexData",
  async ({ startDate, endDate, geometry, index }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SATELLITE}get-index-data`,
        {
          start_date: startDate,
          end_date: endDate,
          geometry,
          index,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const satelliteSlice = createSlice({
  name: "satellite",
  initialState,
  reducers: {
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    resetState: (state) => {
      state.datesData = null;
      state.indexData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch dates data
    builder
      .addCase(fetchDatesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatesData.fulfilled, (state, action) => {
        state.loading = false;
        state.datesData = action.payload.last_six_months_metadata;
      })
      .addCase(fetchDatesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch vegetation index data
    builder
      .addCase(fetchIndexData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndexData.fulfilled, (state, action) => {
        state.loading = false;
        state.indexData = action.payload;
      })
      .addCase(fetchIndexData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedIndex, resetState } = satelliteSlice.actions;

export default satelliteSlice.reducer;
