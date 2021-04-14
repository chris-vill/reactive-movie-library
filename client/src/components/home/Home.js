import React, { useContext, useEffect }  from 'react';
// import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import classNames from 'classnames';
import classes from './Home.sass';
import { POP_MOVIE, TOP_MOVIE, UPCOMING_MOVIE } from '@core/constants';
import { MovieList, Movie } from '@components';
import { UserConfigContext } from '@context/UserConfig';
import TMDB from '@core/tmdb';

const Home = ({ extClass = "" }) => {
  const [ _, setUserConfig ] = useContext(UserConfigContext);

  useEffect(async () => {
    const response = await TMDB.getConfig();
    setUserConfig(response);
  }, []);

  return (
    <div className={ classNames(classes["home"], extClass) }>
      <header>
        <h1>Immense Lowlands</h1>
        <h2>Immense catalog of movie titles</h2>
      </header>
      <main>
        <Router>
          <Switch>
            <Route exact path="/home">
              <MovieList text="Popular Movies" listType={ POP_MOVIE }/>
              <MovieList text="Top Rated" listType={ TOP_MOVIE }/>
              <MovieList text="Upcoming" listType={ UPCOMING_MOVIE }/>
            </Route>
            <Route path="/movie/:id" component={ Movie }/>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default Home;

/*
  Required
  ✅ Login
  ✅ Login Spinner
  ✅ Movie Spinner
  ✅ Popular movies on home page
  ✅ Move cards (name, poster image, release date, popRating)
  - Logout
  ✅ Load more on scroll
  - Responsive design (desktop, mobile, tablet)
  - Filter (year, genre)
  - Search
  - Sorting
  - Movie View (all details)
  - Favorite list
  
  Nice To Have
    - Heroku
    - Jest
*/
