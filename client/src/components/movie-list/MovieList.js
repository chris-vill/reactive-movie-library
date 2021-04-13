import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import classes from './MovieList.sass';
import TMDB from '@core/tmdb';

/*
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
*/

const MovieList = ({ text, listType, extClass = "" }) => {
  const [ movieList, setMovieList ] = useState({});

  useEffect(async () => {
    const response = await TMDB.getMovieList(listType);

    setMovieList(response);
  }, []);

  const Content = movieList?.results
    ? <ul> {
        movieList.results.map(({ title }) => (
          <li key={ title }>{ title }</li>
        ))
      } </ul>
    : <div>Loading</div>

  return (
    <section className={ classNames(classes["movie-list"], extClass) }>
      { Content }
    </section>
  );
}

export default MovieList;
