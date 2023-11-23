import axios from 'axios';
import { baseUrl } from '../helpers/constants';

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
  )
}

export default { login }