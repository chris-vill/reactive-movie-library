import axios from 'axios';
import { ACCESS_TOKEN, API_BASE_URL } from './constants';

const AXIOS = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${ ACCESS_TOKEN }`,
    'Content-Type': 'application/json;charset=utf-8'
  }
});

async function login(credentials) {
  try {
    const { data: auth } = await AXIOS.get('authentication/token/new');

    const authValidation = await AXIOS.post('authentication/token/validate_with_login', {
      request_token: auth.request_token,
      ...credentials
    });

    const { data: session } = await AXIOS.post('authentication/session/new', {
      request_token: auth.request_token
    });

    return new Promise((resolve, reject) => {
      resolve({ auth, session });
    });

  } catch(e) {
    console.error('Something went wrong, please check your credentials and try again.');
  }
}

const methods = {
  login
};

export default methods;