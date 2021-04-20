import React, { createContext, useState } from 'react';
import { FAVORITE_MOVIE } from '@core/constants';

export const MovieCatalogContext = createContext([]);

export const MovieCatalogProvider = (props) => {
  const [ movieCatalog, _setMovieCatalog ] = useState({
    popular: {
      page: 1,
      hasMore: true,
      results: []
    },
    top_rated: {
      page: 1,
      hasMore: true,
      results: []
    },
    upcoming: {
      page: 1,
      hasMore: true,
      results: []
    },
    favorite: {
      page: 1,
      hasMore: true,
      results: []
    }
  });

  function addFavorite(movie) {
    _setMovieCatalog(prev => ({
      ...prev,
      [FAVORITE_MOVIE]: {
        results: [ ...prev[FAVORITE_MOVIE].results, movie ],
        hasMore: prev.hasMore,
        page: prev.page
      }
    }));
  }

  function removeFavorite(movieId) {
    _setMovieCatalog(prev => {
      const prevFavoriteList = prev[FAVORITE_MOVIE].results;
      const index = prevFavoriteList.reduce((index, { id }, i) => {
        if (movieId === id) {
          index === i
        }

        return index;
      }, 0);
      prevFavoriteList.splice(index, 1)

      return {
        ...prev,
        [FAVORITE_MOVIE]: {
          results: [ ...prevFavoriteList ],
          hasMore: prev.hasMore,
          page: prev.page
        }
      };
    });
  }
  
  function setMovieCatalog(listType, { results, page, total_pages }) {
    _setMovieCatalog(prev => ({
      ...prev,
      [listType]: {
        results: listType === FAVORITE_MOVIE
          ? [ ...results ]
          : [ ...prev[listType].results, ...results ],
        hasMore: page < total_pages,
        page
      }
    }));
  }

  return (
    <MovieCatalogContext.Provider value={[ movieCatalog, setMovieCatalog, addFavorite, removeFavorite ]}>
      { props.children }
    </MovieCatalogContext.Provider>
  )
}