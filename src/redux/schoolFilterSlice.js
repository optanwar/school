/* import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBoards: [],
  selectedMediums: [],
  selectedGenders: [],
  distanceRange: [0, 40],
  searchTerm: "",
  
};

const schoolSlice = createSlice({
  name: "schoolFilter",
  initialState,
  reducers: {
    setSelectedBoards(state, action) {
      state.selectedBoards = action.payload;
    },
    setSelectedMediums(state, action) {
      state.selectedMediums = action.payload;
    },
    setSelectedGenders(state, action) {
      state.selectedGenders = action.payload;
    },
    setDistanceRange(state, action) {
      state.distanceRange = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    // Other reducers...
  },
});

export const {
  setSelectedBoards,
  setSelectedMediums,
  setSelectedGenders,
  setDistanceRange,
  setSearchTerm,
  // Other actions...
} = schoolSlice.actions;

export default schoolSlice.reducer;
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBoards: [],
  selectedMediums: [],
  selectedGenders: [],
  distanceRange: [],
  searchTerm: "",
  selectedCat: [],
  selectedTag: [],
  blogSearchTerm: "",
  paginationStep: null,
  blogPagination: null,
};

const schoolSlice = createSlice({
  name: "schoolFilter",
  initialState,
  reducers: {
    setSelectedBoards(state, action) {
      state.selectedBoards = action.payload;
    },
    setSelectedMediums(state, action) {
      state.selectedMediums = action.payload;
    },
    setSelectedGenders(state, action) {
      state.selectedGenders = action.payload;
    },
    setDistanceRange(state, action) {
      state.distanceRange = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearFilters(state) {
      // return initialState;
      state.selectedBoards = [];
      state.distanceRange = [];
      state.selectedGenders = [];
      state.selectedMediums = [];
      state.searchTerm = "";
    },
    setBlogFilter(state, action) {
      state.selectedCat = action.payload.selectedCategories;
      state.selectedTag = action.payload.selectedTags;
      state.blogSearchTerm = action.payload.searchTerm;
    },
    clearBlogFilter(state) {
      state.selectedCat = [];
      state.selectedTag = [];
      state.blogSearchTerm = "";
    },
    setPaginationStep(state, action) {
      state.paginationStep = action.payload;
    },
    resetPaginationStep(state, action) {
      state.paginationStep = null;
    },
    setBlogPagination(state, action) {
      state.blogPagination = action.payload;
    },
    resetBlogPagination(state, action) {
      state.blogPagination = null;
    },
  },
});

export const {
  setSelectedBoards,
  setSelectedMediums,
  setSelectedGenders,
  setDistanceRange,
  setSearchTerm,
  clearFilters,
  setBlogFilter,
  clearBlogFilter,
  setPaginationStep,
  resetPaginationStep,
  setBlogPagination,
  resetBlogPagination,
} = schoolSlice.actions;

export default schoolSlice.reducer;
