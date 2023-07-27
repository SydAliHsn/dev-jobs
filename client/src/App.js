import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { toggleTheme } from './features/themeSlice';
import Header from './components/Header';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';

const App = () => {
  // Theme Toggle
  const theme = useSelector(state => state.theme.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (!storedTheme || storedTheme === theme) return;

    dispatch(toggleTheme(storedTheme));
  });
  // End of Theme Toggle

  // Scroll Restoration
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  // End of Scroll Restoration

  return (
    <div className={`body body--${theme}`}>
      <Header />
      <Routes>
        <Route path="/" element={<JobList />} />

        <Route path="/jobs/:id/:slug" element={<JobDetail />} />
      </Routes>

      <div id="modal-portal"></div>
    </div>
  );
};

export default App;
