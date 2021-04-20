import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './SearchBar.sass';
import { TextInput } from '@components';

const SearchBar = (props) => {
  const { extClass = "" } = props;
  const [ query, setQuery ] = useState("");

  function search({ keyCode }) {
    if (keyCode !== 13) return;

    props.history.push(`/search/${ query }`);
  }

  return (
    <TextInput extClass={ classes['search-input'] } placeholder="Search a movie..." name="search" value={ query } onChange={ setQuery } onKeyDown={ search }/>
  );
}

export default withRouter(SearchBar);
