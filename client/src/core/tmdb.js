import axios from 'axios';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { ACCESS_TOKEN, API_BASE_URL } from './constants';
import { MovieCatalogContext } from '@context/MovieCatalog';
import { AuthContext } from '@context/Auth';

const ENDPOINTS = {
  AUTH_TOKEN: 'authentication/token/new',
  VALIDATE_TOKEN: 'authentication/token/validate_with_login',
  SESSION: 'authentication/session/new',
  CONFIGURATION: 'configuration',
  MOVIE_LIST: 'movie/<list_type>',
  SEARCH_MOVIE: 'search/movie',
  MOVIE: 'movie/<id>'
};
// const TIME_DELAY = 1000 * 5;
const TIME_DELAY = 5;

const AXIOS = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${ ACCESS_TOKEN }`,
    'Content-Type': 'application/json;charset=utf-8'
  }
});

async function login(credentials) {
  try {
    const { data: auth } = await AXIOS.get(ENDPOINTS.AUTH_TOKEN);

    await AXIOS.post(ENDPOINTS.VALIDATE_TOKEN, {
      request_token: auth.request_token,
      ...credentials
    });

    const { data: session } = await AXIOS.post(ENDPOINTS.SESSION, {
      request_token: auth.request_token
    });

    return new Promise((resolve, reject) => {
      resolve({ auth, session });
    });

  } catch(e) {
    console.error('Something went wrong, please check your credentials and try again.');
  }
}

// * For testing!
// * username = 'chrisvill';
// * password = 'jPKCHm&C%S@n!h%4@7G5';
export function useLogout() {
  const [ _, setLogout ] = useContext(AuthContext);

  // try {
  //   setAuth();

  // } catch(e) {
  //   console.error('Something went wrong', e);
  // }

  return {
    setLogout
  }
}

async function getConfig() {
  try {
    const { data } = await AXIOS.get(ENDPOINTS.CONFIGURATION);
    return data;

  } catch(e) {
    console.error('Something went wrong.');
  }
}

export function useMovieDetails(id) {
  const [ movieDetails, setMovieDetails ] = useState({});

  useEffect(async () => {
    try {
      const { data } = await AXIOS.get(ENDPOINTS.MOVIE.replace('<id>', id));
      setMovieDetails(data);

    } catch(e) {
      console.log('Unable to get additional movie details', e);
    }
  }, []);

  return {
    movieDetails,
    setMovieDetails
  }
}

export function useSearchMovie(query, nextPage) {
  const [ movieList, setMovieList ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ hasMore, setHasMore ] = useState(false);

  useEffect(async () => {
    setLoading(true);

    try {
      const { data } = await AXIOS.get(ENDPOINTS.SEARCH_MOVIE, {
        params: {
          page: nextPage,
          query
        }
      });
      
      if (!data) {
        throw new Error('data is undefined.');
      }

      // For testing loading
      setTimeout(() => {
        const newHasMore = data.page < data.total_pages;

        setMovieList([ ...movieList,...data.results ]);
        setLoading(false);
        setHasMore(newHasMore);
      }, TIME_DELAY);
      
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

export function useMovieList(listType, nextPage) {
  const [ movieCatalog, setMovieCatalog ] = useContext(MovieCatalogContext);
  const {
    results: cachedList,
    hasMore: cachedHasMore

  } = movieCatalog[listType];
  const [ movieList, setMovieList ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ hasMore, setHasMore ] = useState(false);
  const [ initialLoad, setInitialLoad ] = useState(true);

  useEffect(async () => {
    if (initialLoad && cachedList.length) {
      setMovieList(cachedList);
      setLoading(false);
      setHasMore(cachedHasMore);
      setInitialLoad(false);
      return;
    }

    setLoading(true);
    setInitialLoad(false);

    try {
      const { data } = await AXIOS.get(ENDPOINTS.MOVIE_LIST.replace('<list_type>', listType), {
        params: {
          page: nextPage
        }
      });
      
      if (!data) {
        throw new Error('data is undefined.');
      }

      // For testing loading
      setTimeout(() => {
        const newHasMore = data.page < data.total_pages;

        setMovieList([ ...movieList,...data.results ]);
        setMovieCatalog(prev => {
          return {
            ...prev,
            [listType]: {
              page: data.page,
              hasMore: newHasMore,
              results: [ ...movieList,...data.results ]
            }
          }
        });
        setLoading(false);
        setHasMore(newHasMore);
      }, TIME_DELAY);
      
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

const methods = {
  login,
  getConfig,
  useMovieList
};

export default methods;