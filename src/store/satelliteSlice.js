// src/redux/slices/satelliteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://api.agromonitoring.com/agro/1.0";
const API_KEY = "f6cc67f52eb8ae0804e31621c10ce21c";

// Async thunk for creating a farm (polygon ID)
export const createFarmPolygon = createAsyncThunk(
  "satellite/createFarmPolygon",
  async ({ name, coordinates }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/polygons`,
        {
          name,
          geo_json: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates,
            },
          },
        },
        {
          params: { appid: API_KEY },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for fetching NDVI History
export const fetchNdviHistory = createAsyncThunk(
  "satellite/fetchNdviHistory",
  async ({ polyid, start, end }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ndvi/history`, {
        params: { polyid, start, end, appid: API_KEY },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for fetching Soil Data
export const fetchSoilData = createAsyncThunk(
  "satellite/fetchSoilData",
  async ({ polyid }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/soil`, {
        params: { polyid, appid: API_KEY },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for fetching Live Image
export const fetchLiveImage = createAsyncThunk(
  "satellite/fetchLiveImage",
  async ({ polyid }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/image/search`, {
        params: { polyid, appid: API_KEY },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  polygonId: null, // Stores the created polygon ID
  ndviData: null,
  soilData: null,
  liveImage: null,
  loading: false,
  error: null,
};

// Slice definition
const satelliteSlice = createSlice({
  name: "satellite",
  initialState,
  reducers: {
    resetSatelliteState: (state) => {
      state.polygonId = null;
      state.ndviData = null;
      state.soilData = null;
      state.liveImage = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Farm Polygon
    builder
      .addCase(createFarmPolygon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFarmPolygon.fulfilled, (state, action) => {
        state.loading = false;
        state.polygonId = action.payload.id; // Store polygon ID
      })
      .addCase(createFarmPolygon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // NDVI History
    builder
      .addCase(fetchNdviHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNdviHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.ndviData = action.payload;
      })
      .addCase(fetchNdviHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Soil Data
    builder
      .addCase(fetchSoilData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSoilData.fulfilled, (state, action) => {
        state.loading = false;
        state.soilData = action.payload;
      })
      .addCase(fetchSoilData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Live Image
    builder
      .addCase(fetchLiveImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveImage.fulfilled, (state, action) => {
        state.loading = false;
        state.liveImage = action.payload;
      })
      .addCase(fetchLiveImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSatelliteState } = satelliteSlice.actions;
export default satelliteSlice.reducer;
