import axios from 'axios';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { ACCESS_TOKEN, API_BASE_URL } from './constants';
import { MovieCatalogContext } from '@context/MovieCatalog'

const ENDPOINTS = {
  AUTH_TOKEN: 'authentication/token/new',
  VALIDATE_TOKEN: 'authentication/token/validate_with_login',
  SESSION: 'authentication/session/new',
  CONFIGURATION: 'configuration',
  MOVIE_LIST: 'movie/<list_type>',
  MOVIE: 'movie/<id>'
};

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

export function useMovieList(listType, nextPage) {
  const [ _, setMovieCatalog ] = useContext(MovieCatalogContext);
  const [ movieList, setMovieList ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ hasMore, setHasMore ] = useState(false);

  useEffect(async () => {
    setLoading(true);

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
        setMovieList([ ...movieList,...data.results ]);
        setMovieCatalog(prev => {
          return {
            ...prev,
            [listType]: [ ...movieList,...data.results ]
          }
        });
        setLoading(false);
        setHasMore(data.page < data.total_pages);
      }, 5000);
      
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