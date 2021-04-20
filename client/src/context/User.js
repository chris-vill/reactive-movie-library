import React, { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from '@context/Auth';
import Storage from '@core/storage';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [ auth ] = useContext(AuthContext);
  const [ user, setUser ] = useState();

  useEffect(() => {
    getUser();

  }, [ auth ]);

  async function getUser() {
    const storedUser = Storage.get('user');

    if (!storedUser) {
      const response = await TMDB.getUser(auth.session_id);
      setUser(response);
      Storage.set('user', response);
    
    } else {
      setUser(storedUser);
    }
  }

  return (
    <UserContext.Provider value={[ user ]}>
      { props.children }
    </UserContext.Provider>
  )
}