import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './MainHeader.sass';
import { SearchBar, Icon } from '@components/';
import { useLogout } from '@core/tmdb';

const MainHeader = (props) => {
  const { extClass = "" } = props;
  const { setLogout } = useLogout();

  function onClickLogout() {
    setLogout();
    props.history.push('/login');
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
      <Icon extClass={ classes['logout-btn'] } iconCode={['fas', 'door-open']} onClick={ onClickLogout }/>
    </div>
  );
}

export default withRouter(MainHeader);
