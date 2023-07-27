import React from 'react';

const Spinner = ({ status }) => {
  if (status === 'loading') return <div className="spinner"></div>;

  return null;
};

export default Spinner;
