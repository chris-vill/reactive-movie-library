import axios from 'axios';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { ACCESS_TOKEN, API_BASE_URL } from './constants';
import { AuthContext } from '@context/Auth';
import storage from '@core/storage';

const ENDPOINTS = {
  MOVIE_LIST: 'movie/<list_type>',
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
  const GET_AUTH_TOKEN = 'authentication/token/new';
  const POST_VALIDATE_TOKEN = 'authentication/token/validate_with_login';
  const POST_SESSION = 'authentication/session/new';

  try {
    const { data: auth } = await AXIOS.get(GET_AUTH_TOKEN);

    await AXIOS.post(POST_VALIDATE_TOKEN, {
      request_token: auth.request_token,
      ...credentials
    });

    const { data: session } = await AXIOS.post(POST_SESSION, {
      request_token: auth.request_token
    });

    return { ...auth, ...session };

  } catch(e) {
    console.error('Something went wrong, please check your credentials and try again.');
  }
}

async function getUser(session_id) {
  const GET_ONFIGURATION = 'configuration';
  const GET_ACCOUNT = 'account';

  try {
    const { data: config } = await AXIOS.get(GET_ONFIGURATION);
    const { data: userData } = await AXIOS.get(GET_ACCOUNT, {
      params: {
        session_id
      }
    });

    return { ...userData, ...config };

  } catch(e) {
    console.error('Something went wrong.', e);
  }
}

async function getMovieList(listType, nextPage) {
  const MOVIE_LIST = `movie/${ listType }`;

  try {
    const { data } = await AXIOS.get(MOVIE_LIST, {
      params: {
        page: nextPage
      }
    });

    return data;
    
  } catch(e) {
    console.error('Unable to get list of movies.', e);
  }
}

async function getFavorites(account_id, session_id) {
  const GET_FAVORITE = `account/${ account_id }/favorite/movies`

  try {
    const { data } = await AXIOS.get(GET_FAVORITE, {
      params: {
        session_id
      }
    });

    return data;

  } catch(e) {
    console.error('Unable to get list of favorites.', e);
  }
}

async function setFavorite({ account_id, session_id, isFavorite, movieId }) {
  const SET_FAVORITE = `account/${ account_id }/favorite`;

  try {
    const { data } = await AXIOS.post(
      SET_FAVORITE,
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: isFavorite
      },
      {
        params: { session_id }
      }
    );

    return data;

  } catch(e) {
    console.error('Unable to mark as favorite.', e);
  }
}

async function searchMovie(query, nextPage) {
  const SEARCH_MOVIE = 'search/movie';

  try {
    const { data } = await AXIOS.get(SEARCH_MOVIE, {
      params: {
        page: nextPage,
        query
      }
    });
    
    return data;
    
  } catch(e) {
    console.error(`Unable to search for ${ query }.`, e);
  }
}

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

const methods = {
  login,
  getUser,
  getMovieList,
  getFavorites,
  setFavorite,
  searchMovie
};

export default methods;