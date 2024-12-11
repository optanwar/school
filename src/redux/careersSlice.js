import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios/axios"; // adjust the path if needed

export const applyJob = createAsyncThunk(
  "applyJob",
  async (commentData, thunkAPI) => {
    try {
      const response = await axios.post("/applyJob", commentData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllJobs = createAsyncThunk("fetchAllJobs", async () => {
  try {
    const response = await axios.get(`/fetchAllJobs`);

    return response?.data;
  } catch (error) {
    return error.response.data.errors;
  }
});

const JobSlice = createSlice({
  name: "jobs",
  initialState: {
    openJob: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //     apply Job
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        //get job
      })
      .addCase(fetchAllJobs.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.openJob = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default JobSlice.reducer;
