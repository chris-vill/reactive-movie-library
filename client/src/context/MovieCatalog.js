import React, { createContext, useState } from 'react';

export const MovieCatalogContext = createContext([]);

export const MovieCatalogProvider = (props) => {
  const initialState = {
    popular: [],
    top_rated: [],
    upcoming: []
  };
  const [ movieList, setMovieList ] = useState(initialState);
 
  return (
    <MovieCatalogContext.Provider value={ [ movieList, setMovieList ] }>
      { props.children }
    </MovieCatalogContext.Provider>
  )
}