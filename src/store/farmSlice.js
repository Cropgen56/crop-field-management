import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for adding a new farm field
export const addFarmField = createAsyncThunk(
  "farm/addFarmField",

  async (
    {
      latlng,
      userId,
      cropName,
      variety,
      sowingDate,
      typeOfIrrigation,
      farmName,
      acre,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/field/add-field/${userId}`,
        {
          latlng,
          userId,
          cropName,
          variety,
          sowingDate,
          typeOfIrrigation,
          farmName,
          acre,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add farm field"
      );
    }
  }
);

// Async thunk for getting farm fields for a user
export const getFarmFields = createAsyncThunk(
  "farm/getFarmFields",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/field/get-field/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch farm fields"
      );
    }
  }
);

// Async thunk for adding a new farm field
export const updateFarmField = createAsyncThunk(
  "farm/updateFarmField",

  async (
    { variety, sowingDate, typeOfIrrigation, fieldName, cropName, farmId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/field/update-field/${farmId}`,
        {
          variety,
          sowingDate,
          typeOfIrrigation,
          fieldName,
          cropName,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update farm field"
      );
    }
  }
);

// Async thunk for adding a new farm field
export const deleteFarmField = createAsyncThunk(
  "farm/updateFarmField",
  async ({ farmId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/field/delete-field/${farmId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update farm field"
      );
    }
  }
);

// Initial state for the farm fields slice
const initialState = {
  fields: [],
  status: "idle",
  error: null,
};

// Farm fields slice
const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Farm Field
      .addCase(addFarmField.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addFarmField.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload && action.payload.farmField) {
          state.fields.push(action.payload.farmField);
        } else {
          console.warn("Farm field not found in the response", action.payload);
        }
      })
      .addCase(addFarmField.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Farm Fields
      .addCase(getFarmFields.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getFarmFields.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fields = action.payload.farmFields;
        state.error = null;
      })
      .addCase(getFarmFields.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Farm Fields
      .addCase(updateFarmField.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateFarmField.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        // state.fields = action.payload.farmFields;
        state.error = null;
      })
      .addCase(updateFarmField.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default farmSlice.reducer;
