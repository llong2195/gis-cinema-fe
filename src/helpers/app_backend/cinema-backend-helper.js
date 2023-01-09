import { get, post, put, del } from "../api_helper";
import { spreadSearchQuery } from "../utilities";
const BASE_API_URL = `http://localhost:4000/api/v1/cinema`;
console.log(process.env);

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
  return put(`${BASE_API_URL}/${cinemaId}`, cinemaUpdate);
};

const deleteCinema = (id) => {
  return del(`${BASE_API_URL}/${id}`);
};

const findARound = (data) => {
  let q = spreadSearchQuery(data).slice(3,spreadSearchQuery(data).length);
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

