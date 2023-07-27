import React from 'react';

import '../sass/job-summary.scss';

const JobSummary = ({ jobData }) => {
  if (!jobData) return null;

  const renderList = items => (
    <ul className="job-summary__list">
      {items.map(item => (
        <li key={item} className="job-summary__list-item">
          <span className="job-summary__bullet">&bull;</span>
          {item}
        </li>
      ))}
    </ul>
  );

  const renderSection = (heading, data) => {
    return (
      <div className="job-summary__section">
        <h3 className="job-summary__section-heading heading--sm">{heading}</h3>
        <p className="job-summary__section-content job-summary__text">{data.content}</p>

        {renderList(data.items)}
      </div>
    );
  };

  return (
    <div className="job-summary">
      <div className="container--slim job-summary__container">
        <div className="job-summary__header">
          <div>
            <span className="job-summary__posted-at">{jobData.postedAt}</span>
            <span className="job-summary__bullet">&bull;</span>
            <span className="job-summary__contract">{jobData.contract}</span>
          </div>
          <h2 className="job-summary__position heading--lg">{jobData.position}</h2>
          <span className="job-summary__location job-location">{jobData.location}</span>

          <a
            target="_blank"
            rel="noreferrer"
            href={jobData.website}
            className="btn-primary job-summary__btn-apply"
          >
            Apply Now
          </a>
        </div>

        <p className="job-summary__description job-summary__text">{jobData.description}</p>

        {renderSection('Requirements', jobData.requirements)}

        {renderSection('What You Will Do', jobData.role)}
      </div>
    </div>
  );
};

export default JobSummary;
