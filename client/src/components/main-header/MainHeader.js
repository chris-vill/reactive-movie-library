import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import classes from './MainHeader.sass';

const MainHeader = ({ extClass = "" }) => {

  return (
    <Link className={ classNames(classes["main-header"], extClass) } to="/home">
      <header>
        <h1>Immense Lowlands</h1>
        <h2>Immense catalog of movie titles</h2>
      </header>
    </Link>
  );
}

export default MainHeader;
