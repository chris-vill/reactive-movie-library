import React, { createContext, useState } from 'react';

export const CurrentMovieContext = createContext([]);

export const CurrentMovieProvider = (props) => {
  const [ movie, setMovie ] = useState({});
 
  return (
    <CurrentMovieContext.Provider value={ [ movie, setMovie ] }>
      { props.children }
    </CurrentMovieContext.Provider>
  )
}