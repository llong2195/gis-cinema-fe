import axios from "axios";
import accessToken from "./jwt_token_access/accessToken";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const API_URL = "";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5kdXlsb25nOTUwMUBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjcyNTg4Njk0LCJleHAiOjE2NzI2MjQ2OTR9.HuIJG6CnSwUS1kiRMJpljwY0gbl-1tHfqOvRI06Ejow";

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}

export async function postWithFormData(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then(response => response.data);
}

export async function putWithFormData(url, data, config = {}) {
  return axiosApi
    .put(url, data, { ...config })
    .then(response => response.data);
}

