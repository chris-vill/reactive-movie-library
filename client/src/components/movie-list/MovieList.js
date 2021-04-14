import React, { useContext, useState, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './MovieList.sass';
import { useMovieList } from '@core/tmdb';
import { MovieListItem } from '@components';
import { MovieCatalogContext } from '@context/MovieCatalog';

const MovieList = ({ text, listType, extClass = "" }) => {
  const initialList = (new Array(20)).fill(0, 0, 20).map((_, i) => ({ id: i }))
  const [ movieCatalog ] = useContext(MovieCatalogContext);
  const { page: cachedPage } = movieCatalog[listType];
  const [ page, setPage ] = useState(cachedPage);
  const { movieList, isLoading, hasMore } = useMovieList(listType, page);
  const observer = useRef();

  // console.log(isLoading);
  // console.log(hasMore);
  // console.log(movieList);

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
    <section className={ classNames(classes["movie-list"], extClass) }>
      <header>
        <h3>{ text }</h3>
      </header>
      <ul>
        {
          (isLoading ? [...movieList,...initialList] : movieList)
            .map(movie => <MovieListItem callback={ lastMovieRef } key={ movie.id } movie={ movie }/>)
        }
      </ul>
    </section>
  );
}

export default withRouter(MovieList);
