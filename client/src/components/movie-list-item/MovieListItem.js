import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

  const Content = (() => {
    if (isLoading) {
      return <LoadingSpinner extClass={ classes["spinner"] }/>;
    }

    return (
      <Link onClick={ () => { setCurrentMovie(movie) } } to={ `movie/${ id }` }>
        <img src={ `${ secure_base_url }${ poster_sizes[2] }${ poster_path }` }/>
        <span>{ title }</span>
        { release_date && <span>{ formatDate(release_date) }</span> }
        <span>Pop Points: { popularity }</span>
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

export default withRouter(MovieListItem);
