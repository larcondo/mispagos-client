import axios from 'axios';
import { baseUrl } from '../helpers/constants';
import { getToken } from '../utils/token';

const axiosWithAuth = axios.create({
  baseURL: baseUrl,
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosWithAuth;