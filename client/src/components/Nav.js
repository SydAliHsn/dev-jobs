import React from 'react';
import { NavLink } from 'react-router-dom';

import BtnTheme from './BtnTheme';
import logo from '../assets/desktop/logo.svg';
import '../sass/nav.scss';

const Nav = () => {
  return (
    <nav className="nav">
      <div className="container">
        <NavLink to="/" className="nav__logo ">
          <img src={logo} alt="devjobs-logo" />
        </NavLink>

        <BtnTheme />
      </div>
    </nav>
  );
};

export default Nav;
