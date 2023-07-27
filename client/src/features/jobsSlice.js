import { createSlice } from '@reduxjs/toolkit';

import getJobs from './thunks/getJobs';

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobsArr: [],
    status: null,
    page: 0,
    total: 0,
    filters: { q: '', location: '', contract: '' },
    filtering: false,
  },
  checkForMore: (state, action) => {
    if (action.payload === state.jobsArr.length) return (state.more = false);

    state.more = true;
  },

  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },

    setJobsArr: (state, action) => {
      state.jobsArr = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    setFiltering: (state, action) => {
      state.filtering = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(getJobs.pending, (state, action) => {
      state.status = 'loading';
    });

    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.status = 'success';
      state.jobsArr.push(...action.payload);
      state.page++;
    });

    builder.addCase(getJobs.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

export const { setTotal, setFilters, setPage, setJobsArr, setFiltering } = jobsSlice.actions;

export default jobsSlice.reducer;
