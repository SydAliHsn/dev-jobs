import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CompanyHeader from './CompanyHeader';
import JobSummary from './JobSummary';
import JobFooter from './JobFooter';
import Spinner from './Spinner';
import getJob from '../features/thunks/getJob';
import '../sass/job-detail.scss';

const JobDetail = () => {
  const dispatch = useDispatch();
  const { job: jobData, status } = useSelector(state => state.selectedJob);

  const { id } = useParams();
  useEffect(() => {
    if (!jobData) dispatch(getJob(id));
  }, []);

  return (
    <div className="job-detail">
      <Spinner status={status} />;
      <CompanyHeader jobData={jobData} />
      <JobSummary jobData={jobData} />
      <JobFooter jobData={jobData} />
    </div>
  );
};

export default JobDetail;
