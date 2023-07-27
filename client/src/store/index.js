import { configureStore } from '@reduxjs/toolkit';

import themeReducer from '../features/themeSlice';
import jobsReducer from '../features/jobsSlice';
import selectedJobReducer from '../features/selectedJobSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    jobs: jobsReducer,
    selectedJob: selectedJobReducer,
  },
});
