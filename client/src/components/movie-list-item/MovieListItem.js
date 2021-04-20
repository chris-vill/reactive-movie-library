import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { formatDate } from '@core/utils';
import classes from './MovieListItem.sass';
import { LoadingSpinner, Icon } from '@components';
import { UserContext } from '@context/User';
import { CurrentMovieContext } from '@context/CurrentMovie';
import useMovieList from '@hooks/use-movie-list';
import { FAVORITE_MOVIE } from '@core/constants';

const MovieListItem = ({ movie, callback, extClass = "" }) => {
  const [ user ] = useContext(UserContext);
  const { movieList: favoriteList, markAsFavorite } = useMovieList(FAVORITE_MOVIE, true);
  const [ _, setCurrentMovie ] = useContext(CurrentMovieContext);
  const { id, title, release_date, popularity, poster_path } = movie;
  const { images: { secure_base_url, poster_sizes } } = user;
  const isLoading = !title || !secure_base_url || !poster_sizes;
  const isFavorite = favoriteList.find(fave => fave.id === id);

  const Content = (() => {
    if (isLoading) {
      return <LoadingSpinner extClass={ classes["spinner"] }/>;
    }

    return (
      <Link onClick={ () => { setCurrentMovie(movie) } } to={ `/movie/${ id }` }>
        <Icon onClick={ toggleFavorite } extClass={ classes['heart-btn'] } icon={ isFavorite ? 'fas-heart' : 'far-heart' }/>
        <img src={ `${ secure_base_url }${ poster_sizes[2] }${ poster_path }` }/>
        <span>{ title }</span>
        { release_date && <span>{ formatDate(release_date) }</span> }
        <span>Pop Points: { popularity }</span>
      </Link>
    );
  })();

  function toggleFavorite(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    markAsFavorite(movie, !isFavorite);
  }

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
