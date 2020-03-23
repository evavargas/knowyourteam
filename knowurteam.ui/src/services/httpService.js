import axios from "axios";

const httpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

function setJwt(jwt) {
  httpService.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}
export default {
  get: httpService.get,
  post: httpService.post,
  put: httpService.put,
  delete: httpService.delete,
  setJwt
};
