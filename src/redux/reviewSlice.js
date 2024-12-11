import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../redux/axios/axios";

export const submitReview = createAsyncThunk(
  "submitReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/submitReview", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "addComment",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/addComment", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewResponse: null,
    commentResponse: null,
    reviewError: null,
  },
  reducers: {
    clearSubmitReviewRes: (state) => {
      state.reviewResponse = null;
      state.reviewError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviewResponse = action.payload;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.reviewError = action.payload;
      })
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.commentResponse = action.payload;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.reviewError = action.payload;
      });
  },
});

export const { clearSubmitReviewRes } = reviewSlice.actions;
export default reviewSlice.reducer;
