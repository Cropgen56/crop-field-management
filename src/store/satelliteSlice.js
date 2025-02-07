import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { polygon } from "leaflet";

const initialState = {
  selectedIndex: "NDVI",
  datesData: null,
  indexData: null,
  cropHealth: null,
  SoilMoisture: null,
  NpkData: null,
  Advisory: null,
  cropYield: null,
  loading: false,
  error: null,
  isLoading: {
    index: false,
  },
};

// Async thunk for fetching dates and true color data
export const fetchDatesData = createAsyncThunk(
  "satellite/fetchDatesData",
  async (geometry, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SATELLITE}/get-true-color-data`,
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
        `${process.env.REACT_APP_API_URL_SATELLITE}/get-index-data`,
        {
          start_date: startDate,
          end_date: endDate,
          geometry: geometry,
          index,
          dataset: "HARMONIZED",
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

// Async thunk for calculate AI Yield
export const calculateAiYield = createAsyncThunk(
  "satellite/calculateAiYield",
  async (farmDetails, { rejectWithValue }) => {
    const convertToCoordinates = (fields) => {
      return fields.map(({ lat, lng }) => [lng, lat]);
    };
    const field = farmDetails?.field;
    const coordinates = convertToCoordinates(field);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SATELLITE}/ai-yield`,
        {
          crop_name: farmDetails?.cropName,
          crop_growth_stage: "Harvesting",
          geometry: [coordinates],
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

// Async thunk for calculate AI Yield
export const fetchCropHealth = createAsyncThunk(
  "satellite/cropHealth",
  async (farmDetails, { rejectWithValue }) => {
    const convertToCoordinates = (fields) => {
      return fields.map(({ lat, lng }) => [lng, lat]);
    };
    const field = farmDetails?.field;
    const coordinates = convertToCoordinates(field);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SATELLITE}/crop-health`,
        {
          geometry: [coordinates],
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

// Async thunk for calculate AI Yield
export const fetchSoilMoisture = createAsyncThunk(
  "satellite/fetchSoilMoisture",
  async (farmDetails, { rejectWithValue }) => {
    const { field } = farmDetails || {};

    const coordinates = [field.map(({ lat, lng }) => [lat, lng])];
    const payload = { coordinates };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SATELLITE}/get-soil-data`,
        payload
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for NPK API
export const fetcNpkData = createAsyncThunk(
  "satellite/fetchNpkData",
  async (farmDetails, { rejectWithValue }) => {
    const convertToCoordinates = (fields) => {
      return fields.map(({ lat, lng }) => [lng, lat]);
    };

    const { field, cropName, sowingDate } = farmDetails || {};
    if (!field || !cropName || !sowingDate) {
      throw new Error("Invalid farm details provided for fetching NPK data.");
    }

    const coordinates = convertToCoordinates(field);

    const payload = {
      crop_name: cropName,
      sowing_date: sowingDate,
      geometry: {
        type: "Polygon",
        coordinates: coordinates,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SATELLITE}/calculate_npk`,
        payload
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for NPK API
export const genrateAdvisory = createAsyncThunk(
  "satellite/genrateAdvisory",
  async (
    { farmDetails, soilMoisture, npkData, language },
    { rejectWithValue }
  ) => {
    const weatherData = JSON.parse(
      localStorage.getItem("weatherData")
    ).currentConditions;

    const {
      cropName,
      sowingDate,
      variety,
      typeOfIrrigation: irrigation_type,
    } = farmDetails || {};

    if (!cropName || !sowingDate || !npkData) {
      throw new Error("Invalid data provided for generating advisory.");
    }
    const payload = {
      crop_name: cropName,
      sowing_date: sowingDate,
      bbch_stage: npkData?.Crop_Growth_Stage,
      variety,
      irrigation_type,
      humidity: Math.round(weatherData?.humidity),
      temp: Math.round(weatherData?.temp),
      rain: weatherData?.precipprob,
      soil_temp: Math.round(
        soilMoisture?.data?.Soil_Temperature?.Soil_Temperature_max || 0
      ),
      soil_moisture: Math.round(
        soilMoisture?.data?.Soil_Moisture?.Soil_Moisture_max || 0
      ),
      language,
      type_of_farming: farmDetails?.typeOfFarming,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SATELLITE}/generate-advisory-crop`,
        payload
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
      state.cropHealth = null;
      state.SoilMoisture = null;
      state.NpkData = null;
    },
    removeIndexData: (state) => {
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
        state.isLoading.index = true;
        state.error = null;
      })
      .addCase(fetchIndexData.fulfilled, (state, action) => {
        state.isLoading.index = false;
        state.indexData = action.payload;
      })
      .addCase(fetchIndexData.rejected, (state, action) => {
        state.isLoading.index = false;
        state.error = action.payload;
      });
    // crop yield
    builder
      .addCase(calculateAiYield.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateAiYield.fulfilled, (state, action) => {
        state.loading = false;
        state.cropYield = action.payload;
      })
      .addCase(calculateAiYield.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // crop health
    builder
      .addCase(fetchCropHealth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCropHealth.fulfilled, (state, action) => {
        state.loading = false;
        state.cropHealth = action.payload;
      })
      .addCase(fetchCropHealth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // fetch NPK Data
    builder
      .addCase(fetcNpkData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetcNpkData.fulfilled, (state, action) => {
        state.loading = false;
        state.NpkData = action.payload;
      })
      .addCase(fetcNpkData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // fetch fetchSoilMoisture data
    builder
      .addCase(fetchSoilMoisture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSoilMoisture.fulfilled, (state, action) => {
        state.loading = false;
        state.SoilMoisture = action.payload;
      })
      .addCase(fetchSoilMoisture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // fetch fetchSoilMoisture data
    builder
      .addCase(genrateAdvisory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(genrateAdvisory.fulfilled, (state, action) => {
        state.loading = false;
        state.Advisory = action.payload;
      })
      .addCase(genrateAdvisory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedIndex, resetState, removeIndexData } =
  satelliteSlice.actions;

export default satelliteSlice.reducer;
