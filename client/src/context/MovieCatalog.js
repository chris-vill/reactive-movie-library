import React, { createContext, useState } from 'react';

export const MovieCatalogContext = createContext([]);

export const MovieCatalogProvider = (props) => {
  const initialState = {
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
    }
  };
  const [ movieList, setMovieList ] = useState(initialState);
 
  return (
    <MovieCatalogContext.Provider value={ [ movieList, setMovieList ] }>
      { props.children }
    </MovieCatalogContext.Provider>
  )
}