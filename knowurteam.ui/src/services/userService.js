import http from './httpService';

const apiEndpoint = '/users';

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUser(id) {
  return http.get(userUrl(id));
}

export function updateUser(id, user) {
  return http.put(userUrl(id), user);
}

export default {
  getUser,
  updateUser
};
