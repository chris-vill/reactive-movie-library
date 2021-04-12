import axios from 'axios';
import { ACCESS_TOKEN, API_BASE_URL } from './constants';

const TMDB = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${ ACCESS_TOKEN }`,
    'Content-Type': 'application/json;charset=utf-8'
  }
});

export default TMDB;