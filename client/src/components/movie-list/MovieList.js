import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './MovieList.sass';
import { MovieListItem, Dropdown, Icon } from '@components';
import useMovieList from '@hooks/use-movie-list';

const MovieList = ({ text, listType, extClass = "" }) => {
  const { movieList, isLoading, hasMore, nextPage } = useMovieList(listType);
  const [ showFilter, setShowFilter ] = useState(false);
  const [ filterBy, setFilterBy ] = useState('');
  const [ sortOption, setSortOption ] = useState({
    sortBy: '',
    sortDirection: 'descending'
  });
  const observer = useRef();
  const lastMovieRef = useCallback(infiniteScrolling, [ isLoading, hasMore ]);
  const date = new Date();

  const filteredList = !filterBy
    ? movieList
    : movieList.filter(movie => {
        if (!movie.release_date) {
          return true;
        }  

        const releaseDate = Number(movie.release_date.match(/^\d{4}/)[0]);
    
        if (filterBy === 'this') {
          return date.getFullYear() === releaseDate;
    
        } else {
          return date.getFullYear() > releaseDate;
        }
      });

  return (<> {
    !movieList.length
      ? null
      : <section className={ classNames(classes["movie-list"], extClass) }>
          <header>
            <h3>{ text }</h3> 
            <Icon extClass={ classNames(classes['sort-icon'], classes[`${ updateSortIcon('title') }-icon`]) } text="Title" icon={ `fas-${ updateSortIcon('title') }` } onClick={() => { updateSort('title') }}/>
            <Icon extClass={ classNames(classes['sort-icon'], classes[`${ updateSortIcon('release_date') }-icon`]) } text="Year" icon={ `fas-${ updateSortIcon('release_date') }` } onClick={() => { updateSort('release_date') }}/>
            <div className={ classes['filter'] }>
              <Icon extClass={ classes['filter-icon'] } onMouseEnter={ toggleFilterMenu } onMouseLeave={ toggleFilterMenu } text="Year" icon="fas-filter"/>
              <ul className={ classNames(classes['filter-menu'], showFilter ? classes['show-filter'] : '') } onMouseEnter={ showFilterMenu } onMouseLeave={ hideFilterMenu }>
                <li onClick={() => { onFilter('this') }}>This Year</li>
                <li onClick={() => { onFilter('last') }}>Last Year</li>
              </ul>
            </div>
          </header>
          <ul> {
            filteredList
              .sort(applySort)
              .map((movie, i) => <MovieListItem callback={ lastMovieRef } key={ movie.id + i } movie={ movie }/>)
          } </ul>
        </section>
  } </>);

  function showFilterMenu() {
    setShowFilter(() => true);
  }

  function hideFilterMenu() {
    setShowFilter(() => false);
  }

  function toggleFilterMenu() {
    setShowFilter(prev => !prev);
  }

  function onFilter(filterBy) {
    setFilterBy(filterBy);
  }

  // Infinite Scrolling =====================================
  function infiniteScrolling(node) {
    if (isLoading) return;

    observer.current && observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (hasMore && entries[0].isIntersecting) {
        nextPage();
      }
    });
    
    node && observer.current.observe(node);
  }
  // Infinite Scrolling =====================================

  function updateSort(sortBy) {
    setSortOption(prev => ({
      ...prev,
      sortBy,
      sortDirection:  !sortOption.sortBy || sortBy !== sortOption.sortBy || sortOption.sortDirection === 'descending'
        ? 'ascending' : 'descending'
    }));
  }

  function updateSortIcon(sortBy) {
    return (
      !sortOption.sortBy || sortBy !== sortOption.sortBy ? 'sort'
      : sortOption.sortDirection === 'ascending' ? 'sort-up'
      : 'sort-down'
    );
  }

  function applySort(a, b) {
    const { sortBy, sortDirection } = sortOption;
    const direction = sortDirection === 'ascending' ? 1 : -1;
    const valA = transform(a[sortBy], sortBy);
    const valB = transform(b[sortBy], sortBy);

    return (
      valA < valB ? -1 * direction
      : valA > valB ? 1 * direction
      : 0
    );

    function transform(string, sortBy) {
      return sortBy === 'release_date' ? new Date(string) : string;
    }
  }
}

export default withRouter(MovieList);
