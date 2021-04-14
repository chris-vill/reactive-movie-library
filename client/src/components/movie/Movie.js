import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { formatDate, formatTime } from '@core/utils';
import classes from './Movie.sass';
import { CurrentMovieContext } from '@context/CurrentMovie';
import { UserConfigContext } from '@context/UserConfig';
import { useMovieDetails } from '@core/tmdb';

const Movie = ({ extClass = "" }) => {
  const { id } = useParams();
  const [ movie ] = useContext(CurrentMovieContext);
  const [ userConfig ] = useContext(UserConfigContext);
  const { movieDetails } = useMovieDetails(id);
  const allDetails = {...movie,...movieDetails};
  const { title, release_date, runtime, genres, tagline, poster_path, overview, backdrop_path } = allDetails;
  const { images: { secure_base_url, backdrop_sizes } } = userConfig;

  console.log(userConfig);
  console.log(allDetails);

  return (
    <section className={ classNames(classes["movie"], extClass) }>
      <img src={ `${ secure_base_url }${ backdrop_sizes[0] }${ poster_path }` }/>
      <article>
        <header>
          <h2>{ title }</h2>
          <h3>{ tagline }</h3>
          <div>
            { release_date && <span>{ formatDate(release_date) }</span> }
            { genres && <span>{ formatGenres(genres) }</span> }
            { runtime && <span>{ formatTime(runtime) }</span> }
          </div>
        </header>
        <section>
          <h4>Overview</h4>
          <p>{ overview }</p>
        </section>        
      </article>
      <img src={ `${ secure_base_url }${ backdrop_sizes[2] }${ backdrop_path }` }/>
    </section>
  );
}

function formatGenres(genres) {
  return genres.reduce((genreString, genre) => genreString + genre.name, "");
}

export default Movie;

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
