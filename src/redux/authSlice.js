import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios/axios";
import Axios from "axios";

const initialState = {
  userRegister: {},
  loginUser: {},
  loading: false,
  error: null,
};

// User Registration

export const userRegister = createAsyncThunk("userRegister", async (user) => {
  try {
    const response = await axios.post(`/userRegister`, user);
    return response?.data;
  } catch (error) {
    return error.response.data.errors;
  }
});
// User Login

export const loginUser = createAsyncThunk("loginUser", async (user) => {
  try {
    const response = await axios.post(`/loginUser`, user);
    return response?.data;
  } catch (error) {
    return error?.response?.data?.errors;
  }
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearLoginUser: (state) => {
      state.loginUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle User Registration
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.userRegister = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle User Login
      .addCase(loginUser.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // state.loading = false;
        state.loginUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearLoginUser } = authSlice.actions;
export default authSlice.reducer;
