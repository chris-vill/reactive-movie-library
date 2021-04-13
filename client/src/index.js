import React, { useContext, useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { AuthContext, AuthProvider } from '@context/auth';
import { Sample, Login } from '@components';
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
  console.log('MAIN');
  console.log(isLoggedIn);

  return (
    <Switch>
      <Route exact path="/">
        {
          isLoggedIn
            ? <Redirect to="/home"/>
            : <Redirect to="/login"/>
        }
      </Route>
      <Route exact path="/home" component={ Sample }/>
      <Route exact path="/login"
        render={ () => <Login callback={ setLoggedIn }/> }
      />
    </Switch>
  );
}

ReactDom.render(
  <AuthProvider>
  <Router>
    <Main/>
  </Router>
  </AuthProvider>,
  document.getElementById("root")
);

/*
  Required
  - Login
  - Popular movies on home page
  - Move cards (name, poster image, release date, popRating)
  - Load more on scroll
  - Responsive design (desktop, mobile, tablet)
  - Filter (year, genre)
  - Search
  - Sorting
  - Movie View (all details)
  - Favorite list
  - Spinner
  
  Nice To Have
    - Heroku
    - Jest
*/