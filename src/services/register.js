import axios from 'axios';
import { baseUrl } from '../helpers/constants';

axios.defaults.withCredentials = true;

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
  )
}

export default { register }