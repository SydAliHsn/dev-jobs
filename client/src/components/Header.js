import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Nav from './Nav';
import SearchBar from './SearchBar';
import '../sass/header.scss';

const Header = () => {
  return (
    <header className="header">
      <Nav />
      <Routes>
        <Route path="/" element={<SearchBar />} />
      </Routes>
    </header>
  );
};

export default Header;
