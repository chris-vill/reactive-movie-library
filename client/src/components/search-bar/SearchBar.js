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

  function searchBarChange({ target: { value } }) {
    setQuery(value);
  }

  return (
    <TextInput extClass={ classes['.search-bar'] } placeholder="Search for a movie" name="search" value={ query } onChange={ searchBarChange } onKeyDown={ search }/>
  );
}

export default withRouter(SearchBar);
