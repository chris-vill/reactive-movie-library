import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './MainHeader.sass';
import { SearchBar, Icon } from '@components/';
import { AuthContext } from '@context/Auth';
import { MovieCatalogContext } from '@context/MovieCatalog';
import TMDB from '@core/tmdb';

const MainHeader = (props) => {
  const [ auth, isLoading, setLogout ] = useContext(AuthContext);
  const [ movieCatalog, setMovieCatalog, addFavorite, removeFavorite, resetMovieCatalog ] = useContext(MovieCatalogContext);
  const { extClass = "" } = props;

  async function onClickLogout() {
    const response = await TMDB.logout(auth.session_id);
    if (response?.success) {
      resetMovieCatalog();
      setLogout();
    }
  }

  return (
    <div className={ classNames(classes["main-header"], extClass) }>
      <Link to="/home">
        <header>
          <h1>Immense Lowlands</h1>
          <h2>Immense catalog of movie titles</h2>
        </header>
      </Link>
      <SearchBar extClass={ classes["search-bar"] }/>
      <Icon extClass={ classes['logout-btn'] } icon={'fas-door-open'} onClick={ onClickLogout }/>
    </div>
  );
}

export default withRouter(MainHeader);
