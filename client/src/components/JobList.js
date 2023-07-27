import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import getJobs from '../features/thunks/getJobs';
import Spinner from './Spinner';
import Message from './Message';
import JobPreview from './JobPreview';

import '../sass/job-list.scss';

const JobsList = () => {
  const dispatch = useDispatch();
  const { jobsArr, total, status } = useSelector(state => state.jobs);

  const loadJobs = () => {
    dispatch(getJobs());
  };

  useEffect(() => {
    if (!jobsArr.length && !(status === 'failed')) loadJobs();
  }, []);

  const renderJobList = jobs => {
    return jobs.map(job => <JobPreview key={job._id} jobData={job} />);
  };

  const renderError = () => {
    return (
      <div className="error job-list__error">
        <i className="fa-solid fa-circle-exclamation"></i> No jobs Found for this query!
      </div>
    );
  };

  const renderLoadBtn = () => {
    if (jobsArr.length && total > jobsArr.length && !(status === 'loading')) {
      return (
        <button className="btn-primary" onClick={loadJobs}>
          Load More
        </button>
      );
    }

    return null;
  };

  return (
    <section className="job-list">
      <div className="container">{renderJobList(jobsArr)}</div>

      <Spinner status={status} />

      {renderLoadBtn()}

      {!jobsArr.length && status === 'success' ? (
        <Message content="No Jobs Found for this query!" />
      ) : null}
    </section>
  );
};

export default JobsList;
