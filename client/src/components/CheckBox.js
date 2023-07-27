import React, { useState, useEffect } from 'react';

import iconCheck from '../assets/desktop/icon-check.svg';

const CheckBox = props => {
  const [checked, setChecked] = useState(props.initChecked);

  useEffect(() => props.changeHandler(`${checked ? 'Full Time' : ''}`), [checked]);

  return (
    <div
      className={`checkbox ${checked ? 'checkbox--checked' : ''}`}
      onClick={() => setChecked(!checked)}
    >
      <img src={iconCheck} alt="✔" />
    </div>
  );
};

export default CheckBox;
