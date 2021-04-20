import React, { createContext, useEffect, useState } from 'react';
import TMDB from '@core/tmdb';
import Storage from '@core/storage';

export const AuthContext = createContext([]);

export const AuthProvider = (props) => {
  const storedAuth = Storage.get('auth');
  const [ auth, setAuth ] = useState(storedAuth || {});
  const [ isLoading, setLoading ] = useState(false);

  async function setLogin(credentials) {
    setLoading(true);

    const response = await TMDB.login(credentials);
    Storage.set('auth', response);
    setAuth(response);
    
    setLoading(false);
  }
 
  return (
    <AuthContext.Provider value={ [ auth, isLoading, setLogin ] }>
      { props.children }
    </AuthContext.Provider>
  )
}