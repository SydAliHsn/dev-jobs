import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { setSelectedJob } from '../features/selectedJobSlice';
import '../sass/job-preview.scss';

const JobPreview = ({ jobData }) => {
  const dispatch = useDispatch();

  if (!jobData) return null;

  return (
    <NavLink
      to={`/jobs/${jobData._id}/${jobData.slug}`}
      className="job-preview"
      onClick={() => dispatch(setSelectedJob(jobData))}
    >
      <div
        className="job-preview__logo-container"
        style={{ backgroundColor: jobData.logoBackground }}
      >
        <div className="job-preview__logo">
          <img src={jobData.logo} alt="logo" />
        </div>
      </div>

      <div className="job-preview__description">
        <div>
          <span className="job-preview__posted-at">{jobData.postedAt}</span>
          <span className="job-preview__bullet">&bull;</span>
          <span className="job-preview__contract">{jobData.contract}</span>
        </div>
        <h2 className="job-preview__position heading--sm">{jobData.position}</h2>
        <p className="job-preview__company">{jobData.company}</p>
      </div>

      <p className="job-location job-preview__location">{jobData.location}</p>
    </NavLink>
  );
};

export default JobPreview;
