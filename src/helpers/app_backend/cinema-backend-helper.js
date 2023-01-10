import { get, post, patch, del } from "../api_helper";
import { spreadSearchQuery } from "../utilities";
const BASE_API_URL = process.env.REACT_APP_CINEMA_ENDPOINT;

const getListCinema = () => {
  return get(`${BASE_API_URL}`);
};

const getCinemaById = (id) => {
  return get(`${BASE_API_URL}/${id}`);
};

const createCinema = (cinemaCreate) => {
  return post(`${BASE_API_URL}`, cinemaCreate);
};

const updateCinema = (cinemaId, cinemaUpdate) => {
  return patch(`${BASE_API_URL}/${cinemaId}`, cinemaUpdate);
};

const deleteCinema = (id) => {
  return del(`${BASE_API_URL}/${id}`);
};

const findARound = (data) => {
  let q = spreadSearchQuery(data).slice(3, spreadSearchQuery(data).length);
  return get(`${BASE_API_URL}/search?${q}`);
};
export {
  getListCinema,
  getCinemaById,
  createCinema,
  updateCinema,
  deleteCinema,
  findARound,
};
