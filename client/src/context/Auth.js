import React, { createContext, useState } from 'react';
import storage from '@core/storage';

export const AuthContext = createContext([]);

export const AuthProvider = (props) => {
  const [ auth, setState ] = useState({});
 
  function setAuth(data) {

    // Logout
    if (!data) {
      setState({});
      storage.remove('auth');
      return
    }

    setState(data);
    storage.set('auth', data);
  }

  return (
    <AuthContext.Provider value={ [ auth, setAuth ] }>
      { props.children }
    </AuthContext.Provider>
  )
}