import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { AuthProvider } from '@context/Auth';
import { MovieCatalogProvider } from '@context/MovieCatalog';
import { UserConfigProvider } from '@context/UserConfig';
import { CurrentMovieProvider } from '@context/CurrentMovie';
import { Home, Login, Movie, MovieGrid } from '@components';
import storage from '@core/storage';
import '@styles/reset';
import '@styles/main';

const Main = () => {
  const [ _, setLoggedIn ] = useState(false);
  const history = useHistory();
  const val = storage.get('auth');

  history.push(
    val ? '/home' : '/login'
  );

  return (
    <Switch>
      <Route exact path="/home" component={ Home }/>
      <Route exact path="/login"
        render={ () => <Login callback={ setLoggedIn }/> }
      />
      <Route path="/movie/:id" component={ Movie }/>
      <Route path="/search/:query" component={ MovieGrid }/>
    </Switch>
  );
};

ReactDom.render(
  <AuthProvider>
  <UserConfigProvider>
  <MovieCatalogProvider>
  <CurrentMovieProvider>
  <Router>
    <Main/>
  </Router>
  </CurrentMovieProvider>
  </MovieCatalogProvider>
  </UserConfigProvider>
  </AuthProvider>,
  document.getElementById("root")
);