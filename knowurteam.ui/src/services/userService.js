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
export function setMainPhoto(userId, id) {
  return http.post(`${userUrl(userId)}/photos/${id}/setMain`, {});
}

export function deletePhoto(userId, id) {
  return http.delete(`${userUrl(userId)}/photos/${id}`);
}

export function addPhoto(userId, photo) {
  return http.post(`${userUrl(userId)}/photos`, photo);
}

export default {
  getUser,
  updateUser,
  setMainPhoto,
  deletePhoto,
  addPhoto
};