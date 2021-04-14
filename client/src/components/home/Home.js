import React, { useContext, useEffect }  from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './Home.sass';
import { POP_MOVIE, TOP_MOVIE, UPCOMING_MOVIE } from '@core/constants';
import { MovieList, Movie, MainHeader } from '@components';
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
      <MainHeader/>
      <main>
        <MovieList text="Popular Movies" listType={ POP_MOVIE }/>
        <MovieList text="Top Rated" listType={ TOP_MOVIE }/>
        <MovieList text="Upcoming" listType={ UPCOMING_MOVIE }/>
      </main>
      <img src="https://img.17qq.com/images/hjjefjebifz.jpeg"/>
    </div>
  );
}

export default withRouter(Home);

/*
  Required
  ✅ Login
  ✅ Login Spinner
  ✅ Movie Spinner
  ✅ Popular movies on home page
  ✅ Move cards (name, poster image, release date, popRating)
  ✅ Logout
  ✅ Load more on scroll
  - Responsive design (desktop, mobile, tablet)
  - Filter (year, genre)
  ✅ Search
  ✅ Sorting (year, title)
  ✅ Movie View (all details)
  - Favorite list
  
  Nice To Have
  ✅ Heroku
  - Jest
*/
