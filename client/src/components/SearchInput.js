import React, { useState, useEffect, useRef } from 'react';

const SearchBarInput = props => {
  const [inputValue, setInputValue] = useState(props.initValue);
  const timeOutRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputValue) return props.changeHandler(inputValue);

    timeOutRef.current = setTimeout(() => {
      props.changeHandler(inputValue);
    }, 500);

    return () => clearTimeout(timeOutRef.current);
  }, [inputValue]);

  const unfocusInput = () => {
    setTimeout(() => inputRef.current.blur(), 0);
  };

  return (
    <input
      ref={inputRef}
      value={inputValue}
      placeholder={props.placeholder}
      onChange={e => {
        setInputValue(e.target.value);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          clearTimeout(timeOutRef.current);

          props.changeHandler(inputValue);

          unfocusInput();
        }
      }}
    />
  );
};

export default SearchBarInput;
