import React from 'react';

import '../sass/job-footer.scss';

const JobFooter = ({ jobData }) => {
  if (!jobData) return null;

  return (
    <div className="job-footer">
      <div className="container--slim">
        <div>
          <h3 className="job-footer__position heading--sm">{jobData.position}</h3>
          <p className="job-footer__company">{jobData.company}</p>
        </div>

        <a href={jobData.website} className="job-footer__btn-apply btn-primary">
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobFooter;
