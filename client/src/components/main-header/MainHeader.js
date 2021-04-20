import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './MainHeader.sass';
import { SearchBar, Icon } from '@components/';
import { UserContext } from '@context/User';

const MainHeader = (props) => {
  const { extClass = "" } = props;
  const [ user ] = useContext(UserContext);

  function onClickLogout() {
    console.log('LOGOUT');
    // setLogout();
    // props.history.push('/login');
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
