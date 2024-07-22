import axios from 'axios';
import { baseUrl } from '@helpers/constants';

axios.defaults.withCredentials = true;

const login = (credentials) => {
  return axios.post(
    `${baseUrl}/login`,
    credentials,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
    }
  );
};

const logout = (username) => {
  return axios.get(
    `${baseUrl}/logout`,
    { name: username },
  );
};

const refresh = () => {
  return axios.get(`${baseUrl}/refresh`);
};

const register = (userData) => {
  return axios.post(
    `${baseUrl}/register`,
    userData,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export default {
  login,
  logout,
  refresh,
  register,
};