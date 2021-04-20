import { useState, useEffect } from 'react';
import TMDB from '@core/tmdb';

export default function useSearchMovie(query, nextPage) {
  const [ movieList, setMovieList ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ hasMore, setHasMore ] = useState(false);

  useEffect(async () => {
    setLoading(true);

    try {
      const data = await TMDB.searchMovie(query, nextPage);
      
      setMovieList([ ...movieList,...data.results ]);
      setLoading(false);
      setHasMore(data.page < data.total_pages);
      
    } catch(e) {
      console.error('Unable to get list of movies.', e);
    }

  }, [ nextPage ]);

  return {
    movieList,
    isLoading,
    hasMore
  };
}