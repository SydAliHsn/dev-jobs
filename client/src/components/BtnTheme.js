import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { toggleTheme } from '../features/themeSlice';
import iconSun from '../assets/desktop/icon-sun.svg';
import iconMoon from '../assets/desktop/icon-moon.svg';

const BtnTheme = () => {
  const currTheme = useSelector(state => state.theme.value);

  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme(currTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div type="checkbox" className="btn-theme-toggler" onClick={handleThemeToggle}>
      <img src={iconSun} alt="sun" />
      <span className={`btn-theme-toggler__slider btn-theme-toggler__slider--${currTheme}`}></span>
      <img src={iconMoon} alt="moon" />
    </div>
  );
};

export default BtnTheme;
