import React, { useContext, useEffect } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { AuthProvider } from '@context/Auth';
import { MovieCatalogProvider } from '@context/MovieCatalog';
import { UserProvider } from '@context/User';
import { CurrentMovieProvider } from '@context/CurrentMovie';
import { AuthContext } from '@context/Auth';
import { Home, Login, Movie, MovieGrid } from '@pages';
import '@styles/reset';
import '@styles/main';

const Main = () => {
  const [ auth ] = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    history.push(
      auth.success ? '/home' : '/login'
    );

  }, [auth]);

  return (
    <Switch>
      <Route exact path="/login" component={ Login }/>
      <Route exact path="/home" component={ Home }/>
      <Route path="/movie/:id" component={ Movie }/>
      <Route path="/search/:query" component={ MovieGrid }/>
    </Switch>
  );
};

ReactDom.render(
  <AuthProvider>
  <UserProvider>
  <MovieCatalogProvider>
  <CurrentMovieProvider>
  <Router>
    <Main/>
  </Router>
  </CurrentMovieProvider>
  </MovieCatalogProvider>
  </UserProvider>
  </AuthProvider>,
  document.getElementById("root")
);