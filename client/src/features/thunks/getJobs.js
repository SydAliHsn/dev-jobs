import { createAsyncThunk } from '@reduxjs/toolkit';

import { setJobsArr, setTotal } from '../jobsSlice';
import jobsApi from '../../apis/jobsApi';

const getJobs = createAsyncThunk('jobs/getJobs', async (_, { getState, dispatch }) => {
  const { filters, page } = getState().jobs;

  // let requestStr = `/jobs?_page=${page + 1}&_limit=9`;
  let requestStr = `/jobs?page=${page + 1}&limit=9`;

  if (filters.q) requestStr += `&q=${filters.q}`;
  if (filters.contract) requestStr += `&contract=${filters.contract}`;
  if (filters.location) requestStr += `&location=${filters.location}`;

  const res = await jobsApi.get(requestStr);
  // const res = await jobsApi.get(requestStr);

  // If the page is 0 then we should first clear the jobsArr
  if (!page) dispatch(setJobsArr([]));

  dispatch(setTotal(res.data.total));

  return res.data.jobs;
});

export default getJobs;
