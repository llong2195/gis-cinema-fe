import axios from "axios";
import accessToken from "./jwt_token_access/accessToken";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const API_URL = "";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {
  axiosApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("GisToken")}`;
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  axiosApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("GisToken")}`;

  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function patch(url, data, config = {}) {
  axiosApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("GisToken")}`;

  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  axiosApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("GisToken")}`;

  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}

export async function postWithFormData(url, data, config = {}) {
  axiosApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("GisToken")}`;
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data);
}

export async function putWithFormData(url, data, config = {}) {
  axiosApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("GisToken")}`;

  return axiosApi
    .put(url, data, { ...config })
    .then((response) => response.data);
}
