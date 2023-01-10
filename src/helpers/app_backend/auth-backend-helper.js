import { get, post, patch, del } from "../api_helper";
import { spreadSearchQuery } from "../utilities";
const BASE_API_URL = process.env.REACT_APP_AUTH_ENDPOINT;

const login = (dataLogin) => {
  return post(`${BASE_API_URL}/login`, dataLogin);
};

export { login };
