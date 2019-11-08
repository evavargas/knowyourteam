import http from './httpService';
import jwtDecode from 'jwt-decode';

const apiEndPoint = '/auth';
const tokenKey = 'token';

export async function login(model) {
  //   const { data: credentials } = await http.post(apiEndPoint + '/login', model);
  const { data: credentials } = await http.post(`${apiEndPoint}/login`, model);
  if (credentials) {
    localStorage.setItem(tokenKey, credentials.token);
  }
  return credentials;
}

export function trySignUp() {
  let credentials;
  try {
    //Obtener el token
    const token = getJwt();
    if (token) {
      const decodedToken = getDecodedToken();
      credentials = {
        token,
        decodedToken
      };
    }
  } catch (error) {
    return null;
  }
  return credentials;
}

function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

export function getJwt() {
  return getLocalStorageItem(tokenKey);
}

export function getDecodedToken() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function register(user) {
  return http.post(`${apiEndPoint}/register`, user);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  register,
  getDecodedToken,
  logout,
  getJwt,
  trySignUp
};
