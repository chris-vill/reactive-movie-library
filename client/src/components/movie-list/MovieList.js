import React, { useContext, useState, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './MovieList.sass';
import { useMovieList } from '@core/tmdb';
import { MovieListItem, Dropdown, Icon } from '@components';
import { MovieCatalogContext } from '@context/MovieCatalog';

const MovieList = ({ text, listType, extClass = "" }) => {
  const initialList = (new Array(20)).fill(0, 0, 20).map((_, i) => ({ id: i }))
  const [ sortOption, setSortOption ] = useState({
    sortBy: '',
    sortDirection: 'descending'
  });
  const [ movieCatalog ] = useContext(MovieCatalogContext);
  const { page: cachedPage } = movieCatalog[listType];
  const [ page, setPage ] = useState(cachedPage);
  const { movieList, isLoading, hasMore } = useMovieList(listType, page);
  const observer = useRef();
  const lastMovieRef = useCallback(infiniteScrolling, [ isLoading, hasMore ]);

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

  function infiniteScrolling(node) {
    if (isLoading) return;

    observer.current && observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (hasMore && entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    
    node && observer.current.observe(node);
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

  return (
    <section className={ classNames(classes["movie-list"], extClass) }>
      <header>
        <h3>{ text }</h3> 
        <Icon extClass={ classNames(classes['sort-icon'], classes[`${ updateSortIcon('title') }-icon`]) } text="Title" iconCode={ ['fas', updateSortIcon('title')] } onClick={() => { updateSort('title') }}/>
        <Icon extClass={ classNames(classes['sort-icon'], classes[`${ updateSortIcon('release_date') }-icon`]) } text="Year" iconCode={ ['fas', updateSortIcon('release_date')] } onClick={() => { updateSort('release_date') }}/>
        {/* <Dropdown extClass={ classes['sort-icon'] } iconCode={ ['fas', 'sort'] } options={ sortOptions }/> */}
      </header>
      <ul>
        {
          (isLoading ? [...movieList,...initialList] : movieList)
            .sort(applySort)
            .map((movie, i) => <MovieListItem callback={ lastMovieRef } key={ movie.id + i } movie={ movie }/>)
        }
      </ul>
    </section>
  );
}

export default withRouter(MovieList);
