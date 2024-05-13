import axios from 'axios';
import { baseUrl } from '../helpers/constants';
axios.defaults.withCredentials = true;

const changeFirstName = (data, token) => {
  return axios.post(
    `${baseUrl}/config/firstName`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

const changeLastName = (data, token) => {
  return axios.post(
    `${baseUrl}/config/lastName`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

const changeEmail = (data, token) => {
  return axios.post(
    `${baseUrl}/config/email`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export default {
  changeFirstName,
  changeLastName,
  changeEmail,
};