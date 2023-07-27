import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import SelectInput from './SelectInput';
import SearchInput from './SearchInput';
import CheckBox from './CheckBox';
import Modal from './Modal';

import getJobs from '../features/thunks/getJobs';
import { setFilters, setJobsArr, setPage, setFiltering } from '../features/jobsSlice';

import iconLocation from '../assets/desktop/icon-location.svg';
import iconSearchWhite from '../assets/desktop/icon-search-white.svg';
import iconSearch from '../assets/desktop/icon-search.svg';
import iconFilter from '../assets/mobile/icon-filter.svg';

import '../sass/search-bar.scss';

const SearchBar = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const filtering = useSelector(state => state.jobs.filtering);
  const currFilters = useSelector(state => state.jobs.filters);

  let newFilters = { ...currFilters };

  const getFilteredJobs = () => {
    dispatch(setJobsArr([]));
    dispatch(setPage(0));
    dispatch(getJobs());
  };

  const changeFilter = (property, value) => {
    newFilters = { ...currFilters, [property]: value };

    if (!isEqual(newFilters, currFilters)) {
      dispatch(setFilters(newFilters));
    }

    // If filtering is true then we don't wait for foe filter is changed
    if (filtering && !isEqual(newFilters, currFilters)) getFilteredJobs();
  };

  const filter = () => {
    // Set the filtering to true when it is submitted to search for new jobs
    // and directly get the new jobs when submitted first time
    dispatch(setFiltering(true));

    getFilteredJobs();
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    filter();
  };

  const toggleModal = () => {
    if (modalVisible && !filtering) filter();

    setModalVisible(!modalVisible);
  };

  const renderModal = () => {
    if (!modalVisible) return null;

    return (
      <Modal overlayClickHandler={toggleModal}>
        <div className="search-bar__modal-content">
          <div className="search-bar__modal-location search-bar__modal-field">
            <img src={iconLocation} alt="search-icon" />
            <SelectInput
              initSelected={currFilters.location}
              default="none"
              title="Filter by Location..."
              options={[
                'United States',
                'Russia',
                'Germany',
                'New Zealand',
                'United Kingdom',
                'Singapore',
                'Japan',
              ]}
              changeHandler={value => changeFilter('location', value)}
            />
          </div>

          <div className="search-bar__checkbox-container search-bar__modal-field">
            <CheckBox
              initChecked={currFilters.contract === 'Full Time' ? true : false}
              changeHandler={value => changeFilter('contract', value)}
            />
            <label className="search-bar__label">Full Time Only</label>
          </div>

          <button
            onClick={() => {
              setModalVisible(false);
              filter();
            }}
            className="btn-primary search-bar__modal-search-btn"
          >
            Search
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <form className="search-bar" onSubmit={formSubmitHandler}>
      <div className="container">
        <div className="search-bar__field">
          <img src={iconSearch} alt="search-icon" className="search-bar__field-icon hidden--md" />
          <SearchInput
            initValue={currFilters.q}
            placeholder={
              window.matchMedia('(min-width:390px)').matches
                ? 'Filter by title, company, expertise...'
                : 'Filter by relativity'
            }
            changeHandler={value => changeFilter('q', value)}
          />
        </div>

        <div className="search-bar__field search-bar__location hidden--md">
          <img src={iconLocation} alt="search-icon" className="search-bar__field-icon" />
          <SelectInput
            initSelected={currFilters.location}
            default="none"
            title="Filter by Location..."
            options={[
              'United States',
              'Russia',
              'Germany',
              'New Zealand',
              'United Kingdom',
              'Singapore',
              'Japan',
            ]}
            changeHandler={value => changeFilter('location', value)}
          />
        </div>

        <div className="search-bar__field search-bar__contract hidden--md">
          <div className="search-bar__checkbox-container">
            <CheckBox
              initChecked={currFilters.contract === 'Full Time' ? true : false}
              changeHandler={value => changeFilter('contract', value)}
            />
            <label className="search-bar__label">Full Time Only</label>
          </div>

          <button type="submit" className="btn-primary search-bar__btn-submit">
            <span>Search</span>
            <img src={iconSearchWhite} alt="search" />
          </button>
        </div>

        <div className="search-bar__mobile-btn-container">
          <button type="button" className="search-bar__filter-modal-toggler" onClick={toggleModal}>
            <img src={iconFilter} alt="filter" />
          </button>

          <button type="submit" className="btn-primary search-bar__btn-submit">
            <img src={iconSearchWhite} alt="search" />
          </button>
        </div>
      </div>
      {renderModal()}
    </form>
  );
};

export default SearchBar;
