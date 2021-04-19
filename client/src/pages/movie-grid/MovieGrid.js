import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import classes from './MovieGrid.sass';
import { MainHeader, MovieListItem } from '@components';
import { useSearchMovie } from '@core/tmdb';

const MovieGrid = ({ extClass = "" }) => {
  const initialList = (new Array(20)).fill(0, 0, 20).map((_, i) => ({ id: i }))
  const { query } = useParams();
  const [ page, setPage ] = useState(1);
  const { isLoading, hasMore, movieList } = useSearchMovie(query, page);
  const observer = useRef();

  const lastMovieRef = useCallback(node => {
    if (isLoading) return;

    observer.current && observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (hasMore && entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    
    node && observer.current.observe(node);

  }, [ isLoading, hasMore ]);

  return (
    <div className={ classNames(classes["movie-grid"], extClass) }>
      <MainHeader/>
      <main>
        <h4>Search results for "{ query }"</h4>
        <ul>
          {
            (!isLoading && movieList.length ? [...movieList,...initialList] : movieList)
              .map(movie => <MovieListItem callback={ lastMovieRef } key={ movie.id } movie={ movie }/>)
          }
        </ul>
      </main>
    </div>
  );
}

export default MovieGrid;
