import { get, post, patch, del } from "../api_helper";
import { spreadSearchQuery } from "../utilities";
const BASE_API_URL = `http://localhost:4000/api/v1/auth`;

const login = (dataLogin) => {
  return post(`${BASE_API_URL}/login`, dataLogin);
};

export { login };
