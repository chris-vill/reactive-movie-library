import React, { useContext }  from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './Home.sass';
import { POP_MOVIE, TOP_MOVIE, UPCOMING_MOVIE, FAVORITE_MOVIE } from '@core/constants';
import { MovieList, MainHeader, LoadingSpinner } from '@components';
import { UserContext } from '@context/User';
import backgroundImg from '@assets/movie-background.png';

const Home = ({ extClass = "" }) => {
  const [ user ] = useContext(UserContext);
  const mainClasses = classNames(
    classes["home"],
    !user ? classes['home-loading'] : '',
    extClass
  );

  const MainContent = <>
      <MainHeader/>
      <main>
        <MovieList text="Favorite Movies" listType={ FAVORITE_MOVIE }/>
        <MovieList text="Popular Movies" listType={ POP_MOVIE }/>
        <MovieList text="Top Rated" listType={ TOP_MOVIE }/>
        <MovieList text="Upcoming" listType={ UPCOMING_MOVIE }/>
      </main>
      <img src={ backgroundImg }/>
  </>;

  return (
    <div className={ mainClasses }> {
      !user
        ? <LoadingSpinner/>
        : MainContent
    } </div>
  );
}

export default withRouter(Home);

/*
  Requests:
  * Get auth token
  * Validate auth token with user creds
  * Get session
  * Get config
  * Get user
  
  * Get movie details

  * Get movie list
  * Search movie
  * Get favorite movies

  * Set movie as favorite
  

  Page
  * Login
  - Get auth token
  - Validate auth token with user creds
  - Get session
  - Get config
  - Get user

  * Movie
  - Get movie details
  - Set movie as favorite
  
  * Movie list
  - Get movie list
  - Search movie
  - Get favorite movies


  Context
  * AuthContext
  - auth token, session

  * UserContext
  - user, config

  * MovieCatalogContext
  - popular, top rated, upcoming, favorite
  - search movies
  - set fave

  * MovieContext
  - movie details


*/

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
