import { useContext, useEffect, useState } from 'react';
import { MovieCatalogContext } from '@context/MovieCatalog';
import TMDB from '@core/tmdb';
import { FAVORITE_MOVIE } from '@core/constants';
import { AuthContext } from '@context/Auth';
import { UserContext } from '@context/User';

export default function useMovieList(listType, onlyOnUpdate) {
  const [ auth ] = useContext(AuthContext);
  const [ user ] = useContext(UserContext);
  const loadingList = (new Array(20)).fill(0, 0, 20).map((_, i) => ({ id: i }));
  const [ movieCatalog, setMovieCatalog, addFavorite, removeFavorite ] = useContext(MovieCatalogContext);
  const {
    page: prevPage,
    results: movieList,
    hasMore
  } = movieCatalog[listType];
  const [ page, setPage ] = useState(prevPage);
  const [ isLoading, setLoading ] = useState(false);

  useEffect(async () => {
    if (onlyOnUpdate) {
      onlyOnUpdate = false;
      return;
    }

    setLoading(true);

    const response = listType === FAVORITE_MOVIE
      ? await TMDB.getFavorites(user.id, auth.session_id)
      : await TMDB.getMovieList(listType, page);

    setLoading(false);
    setMovieCatalog(listType, response);

  }, [ page ]);

  async function markAsFavorite(movie, isFavorite) {
    const { success } = await TMDB.setFavorite({
      account_id: user.id,
      session_id: auth.session_id,
      isFavorite,
      movieId: movie.id
    });

    if (!success) return;

    if (isFavorite) {
      addFavorite(movie);
    
    } else {
      removeFavorite(movie.id);
    }
  }

  function nextPage() {
    setPage(prev => prev + 1);
  }

  return {
    movieList: isLoading
      ? [ ...movieList, ...loadingList ]
      : movieList,
    isLoading,
    hasMore,
    nextPage,
    markAsFavorite
  };
}