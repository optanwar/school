import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./axios/axios";
import Axios from "axios";

const initialState = {
  compareList: [], // Add a new field for comparison list
  schoolsData: {},
  singleSchoolsData: {},
  singleBlogCountData: {},
  articlesData: {},
  aboutUs: "",
  userIP: {},
  whyChooseUs: {},
  testimonials: {},
  // baseUrl: `https://nodeapp.shrinkcom.com/school-dekho-backend`,
  // baseUrl: "http://192.168.0.239:6800",
  baseUrl: "http://192.168.0.209:6800",
  contactUsFormResp: {},
  fetchContactUsResp: null,
  featuredOnResp: null,
  userCord: {},
  totalEnquiry: {},
  selectedSchoolId: null,
  selectedBlogId: null,
  selectJobId: null,
};

// Fetch all schools
export const fetchAllSchool = createAsyncThunk(
  "fetchAllSchool",
  async (data) => {
    try {
      const response = await axios.post(`/fetchAllSchool`, data);
      return response?.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }
);

// FetchSingle schools
export const getAschool = createAsyncThunk("getAschool", async (data) => {
  try {
    const response = await axios.post(`/getAschool`, data);
    return response?.data;
  } catch (error) {
    return error.response.data.errors;
  }
});

// Fetch all articles
export const fetchAllArticles = createAsyncThunk(
  "fetchAllArticles",
  async () => {
    try {
      const response = await axios.get(`/fetchAllArticles`);
      return response?.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }
);
// FetchSingle Blog
export const getArticle = createAsyncThunk("getArticle", async (data) => {
  try {
    const response = await axios.post(`/getArticle`, data);
    return response?.data;
  } catch (error) {
    return error.response.data.errors;
  }
});

// Fetch all articles
export const getReqCallbackCount = createAsyncThunk(
  "getReqCallbackCount",
  async () => {
    try {
      const response = await axios.get(`/getReqCallbackCount`);
      return response?.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }
);

export const fetchTestimonials = createAsyncThunk(
  "fetchTestimonials",
  async () => {
    try {
      const response = await axios.get(`/fetchAllTestimonials`);
      return response?.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }
);
export const fetchAboutUs = createAsyncThunk("fetchAboutUs", async () => {
  try {
    const response = await axios.get(`/fetchAboutUs`);

    return response?.data;
  } catch (error) {
    return error.response.data.errors;
  }
});
export const userIPAddress = createAsyncThunk("userIPAddress", async () => {
  try {
    const response = await axios.get(`https://api.ipify.org?format=json`);

    return response?.data;
  } catch (error) {
    return error.response.data.errors;
  }
});

export const totalDocuments = createAsyncThunk("totalDocuments", async () => {
  try {
    const response = await axios.get(`/totalDocuments`);

    return response?.data;
  } catch (error) {
    return error.response.data.errors;
  }
});

export const contactUsForm = createAsyncThunk("contactUsForm", async (data) => {
  try {
    const response = await axios.post(`/contactUsForm`, data);

    return response?.data;
  } catch (error) {
    return error.response.data.errors;
  }
});
export const fetchContactUs = createAsyncThunk(
  "fetchContactUs",
  async (data) => {
    try {
      const response = await axios.get(`/fetchContactUs`);

      return response?.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }
);
export const fetchFeaturedOn = createAsyncThunk(
  "fetchFeaturedOn",
  async (data) => {
    try {
      const response = await axios.get(`/fetchFeaturedOn`);

      return response?.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateData: (state, action) => {
      return { ...state, schools: action.payload };
    },
    addToCompare: (state, action) => {
      if (
        !state.compareList.includes(action.payload) &&
        state?.compareList?.length < 3
      ) {
        state.compareList.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      // Remove school ID from compare list
      state.compareList = state.compareList.filter(
        (id) => id !== action.payload
      );
    },
    setGetSchoolData: (state, action) => {
      state.getSchoolData = action.payload;
    },
    clearContactUsFormResp: (state) => {
      state.contactUsFormResp = null;
    },
    setUserCord: (state, action) => {
      state.userCord = action.payload;
    },
    setSelectedSchoolId: (state, action) => {
      state.selectedSchoolId = action.payload;
    },
    setSelectedBloglId: (state, action) => {
      state.selectedBlogId = action.payload;
    },
    setJobId: (state, action) => {
      state.selectJobId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllSchool
      .addCase(fetchAllSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolsData = action.payload;
      })
      .addCase(fetchAllSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle Get Single School
      .addCase(getAschool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAschool.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSchoolsData = action.payload;
      })
      .addCase(getAschool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchAllArticles

      .addCase(fetchAllArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articlesData = action.payload;
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle Get Single blog
      .addCase(getArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlogCountData = action.payload;
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle fetchAllArticles

      .addCase(getReqCallbackCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReqCallbackCount.fulfilled, (state, action) => {
        state.loading = false;
        state.totalEnquiry = action.payload;
      })
      .addCase(getReqCallbackCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // testimonial
      .addCase(fetchTestimonials.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // about us
      .addCase(fetchAboutUs.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAboutUs.fulfilled, (state, action) => {
        state.aboutUs = action.payload;
      })
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // user IP address
      .addCase(userIPAddress.pending, (state) => {
        state.error = null;
      })
      .addCase(userIPAddress.fulfilled, (state, action) => {
        state.userIP = action.payload;
      })
      .addCase(userIPAddress.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // totalDocuments
      .addCase(totalDocuments.pending, (state) => {
        state.error = null;
      })
      .addCase(totalDocuments.fulfilled, (state, action) => {
        state.whyChooseUs = action.payload;
      })
      .addCase(totalDocuments.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // contact Us Form
      .addCase(contactUsForm.pending, (state) => {
        state.error = null;
      })
      .addCase(contactUsForm.fulfilled, (state, action) => {
        state.contactUsFormResp = action.payload;
      })
      .addCase(contactUsForm.rejected, (state, action) => {
        state.contactUsFormResp = action.payload;
      })
      // fetch contact us
      .addCase(fetchContactUs.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchContactUs.fulfilled, (state, action) => {
        state.fetchContactUsResp = action.payload;
      })
      .addCase(fetchContactUs.rejected, (state, action) => {
        state.fetchContactUsResp = action.payload;
      })
      // fetch featuredOn

      .addCase(fetchFeaturedOn.fulfilled, (state, action) => {
        state.featuredOnResp = action.payload;
      });
  },
});

export const {
  updateData,
  addToCompare,
  removeFromCompare,
  setGetSchoolData,
  clearContactUsFormResp,
  setUserCord,
  setSelectedSchoolId,
  setSelectedBloglId,
  setJobId,
} = dataSlice.actions;

export default dataSlice.reducer;
