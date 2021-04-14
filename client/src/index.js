import React, { useState, useEffect, useContext } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { AuthProvider } from '@context/Auth';
import { MovieCatalogProvider } from '@context/MovieCatalog';
import { UserConfigProvider } from '@context/UserConfig';
import { CurrentMovieProvider } from '@context/CurrentMovie';
import { Home, Login } from '@components';
import storage from '@core/storage';
import '@styles/reset';
import '@styles/main';

library.add(fab);
library.add(far);
library.add(fas);

// * For testing!
// * username = 'chrisvill';
// * password = 'jPKCHm&C%S@n!h%4@7G5';

const Main = () => {
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const val = storage.get('auth');
    history.push(
      val ? '/home' : '/login'
    );

  }, [ isLoggedIn ]);

  return (
    <Switch>
      <Route exact path="/home" component={ Home }/>
      <Route exact path="/login"
        render={ () => <Login callback={ setLoggedIn }/> }
      />
    </Switch>
  );
}

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