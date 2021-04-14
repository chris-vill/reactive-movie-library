import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { formatDate } from '@core/utils';
import classes from './MovieListItem.sass';
import { LoadingSpinner } from '@components';
import { UserConfigContext } from '@context/UserConfig';
import { CurrentMovieContext } from '@context/CurrentMovie';

const MovieListItem = ({ movie, callback, extClass = "" }) => {
  const [ userConfig ] = useContext(UserConfigContext);
  const [ _, setCurrentMovie ] = useContext(CurrentMovieContext);
  const { id, title, release_date, popularity, poster_path } = movie;
  const { images: { secure_base_url, poster_sizes } } = userConfig;
  const isLoading = !title || !secure_base_url || !poster_sizes;

  function onMovieListItemClick() {
    setCurrentMovie(movie);
  }

  const Content = (() => {
    if (isLoading) {
      return <LoadingSpinner extClass={ classes["spinner"] }/>;
    }

    return (
      <Link onClick={ onMovieListItemClick } to={ `movie/${ id }` }>
        <img src={ `${ secure_base_url }${ poster_sizes[2] }${ poster_path }` }/>
        <span>{ popularity }</span>
        <span>{ title }</span>
        <span>{ formatDate(release_date) }</span>
      </Link>
    );
  })();

  return (<>{
    callback
    ? <li ref={callback} className={ classNames(classes["movie-list-item"], isLoading ? classes["is-loading"] : '', extClass) }>
        { Content }
      </li>
    : <li className={ classNames(classes["movie-list-item"], isLoading ? classes["is-loading"] : '', extClass) }>
        { Content }
      </li>
  }</>);
}

export default MovieListItem;
