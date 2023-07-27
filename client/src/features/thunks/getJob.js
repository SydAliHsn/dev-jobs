import { createAsyncThunk } from '@reduxjs/toolkit';

import jobsApi from '../../apis/jobsApi';

const getJob = createAsyncThunk('jobs/getJob', async (_id, thunkApi) => {
  const { data } = await jobsApi.get(`/jobs/${_id}`);

  console.log(data.job);

  return data.job;
});

export default getJob;
