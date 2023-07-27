import { createSlice } from '@reduxjs/toolkit';

import getJob from './thunks/getJob';

const selectedJobSlice = createSlice({
  name: 'selectedJob',
  initialState: { job: null, status: null },

  reducers: {
    setSelectedJob: (state, action) => {
      state.job = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(getJob.pending, (state, action) => {
      state.status = 'loading';
    });

    builder.addCase(getJob.fulfilled, (state, action) => {
      state.status = 'success';
      state.job = action.payload;
    });

    builder.addCase(getJob.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

export const { setSelectedJob } = selectedJobSlice.actions;

export default selectedJobSlice.reducer;
