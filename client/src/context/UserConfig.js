import React, { createContext, useState } from 'react';

export const UserConfigContext = createContext([]);

export const UserConfigProvider = (props) => {
  const initialState = {
    images: {
      secure_base_url: "",
      poster_sizes: []
    }
  };
  const [ userConfig, setUserConfig ] = useState(initialState);
 
  return (
    <UserConfigContext.Provider value={ [ userConfig, setUserConfig ] }>
      { props.children }
    </UserConfigContext.Provider>
  )
}