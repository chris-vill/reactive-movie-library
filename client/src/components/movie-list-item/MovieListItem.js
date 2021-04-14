import React, { useEffect, useContext } from 'react';
import classNames from 'classnames';
import { format as formatDate } from 'date-fns';
import classes from './MovieListItem.sass';
import { LoadingSpinner } from '@components';
import { UserConfigContext } from '@context/UserConfig';

const MovieListItem = ({ movie, callback, extClass = "" }) => {
  const [ userConfig ] = useContext(UserConfigContext);
  const { title, release_date, popularity, poster_path } = movie;
  const { images: { secure_base_url, poster_sizes } } = userConfig;
  const isLoading = !title || !secure_base_url || !poster_sizes;

  const Content = (() => {
    if (isLoading) {
      return <LoadingSpinner extClass={ classes["spinner"] }/>;
    }

    return <>
      <img src={ `${ secure_base_url }${ poster_sizes[2] }${ poster_path }` }/>
      <span>{ popularity }</span>
      <span>{ title }</span>
      <span>{ formatDate(new Date(release_date), 'MMM dd, yyyy') }</span>
    </>;
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

/*
  Sample Movie JSON

  adult: false
  backdrop_path: "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg"
  genre_ids: [28, 878]
  id: 399566
  original_language: "en"
  original_title: "Godzilla vs. Kong"
  overview: "In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages."
  popularity: 7618.712
  poster_path: "/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"
  release_date: "2021-03-24"
  title: "Godzilla vs. Kong"
  video: false
  vote_average: 8.4
  vote_count: 4307

  Movie Poster
  base_url, size and poster_path
  https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
*/
