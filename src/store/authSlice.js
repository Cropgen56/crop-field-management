import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register-user`,
        userData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        return rejectWithValue("No response from the server.");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const userData = action?.payload?.data;
        localStorage.setItem("userData", JSON.stringify(userData));
        state.user = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
