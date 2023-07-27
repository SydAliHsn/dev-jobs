import React, { useState, useEffect } from 'react';

const SelectInput = props => {
  const [selected, setSelected] = useState(props.initSelected);

  useEffect(() => {
    // We have to send back empty string('') if selected is null. Sending null causes a bug
    props.changeHandler(selected ? selected : '');
  }, [selected]);

  const renderOptions = options => {
    return options.map((opt, i) => (
      <option key={i} className="select__option">
        {opt}
      </option>
    ));
  };

  return (
    <select
      // if the selected option is none then change the value to the title
      value={!selected ? 'title' : selected}
      className={`select select--${!selected ? 'fade' : ''}`}
      onChange={e => setSelected(e.target.value)}
    >
      <option disabled hidden value="title">
        {props.title}
      </option>
      <option value="">None</option>
      {renderOptions(props.options)}
    </select>
  );
};

export default SelectInput;
