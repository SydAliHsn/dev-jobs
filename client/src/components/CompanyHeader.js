import React from 'react';

import '../sass/company-header.scss';

const CompanyHeader = ({ jobData }) => {
  if (!jobData) return null;

  return (
    <div className="company-header">
      <div className="company-header__container container--slim">
        <div
          className="company-header__logo-container"
          style={{ background: jobData.logoBackground }}
        >
          <img src={jobData.logo} alt="" className="company-header__logo" />
        </div>
        <div className="company-header__description">
          <h2 className="company-header__company">{jobData.company}</h2>
          <p className="company-header__website">{jobData.website.replace('https://', '')}</p>
        </div>

        <a
          target="_blank"
          rel="noreferrer"
          href={jobData.website}
          className="btn-secondary company-header__btn-website"
        >
          Company Site
        </a>
      </div>
    </div>
  );
};

export default CompanyHeader;
