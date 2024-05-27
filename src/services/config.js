import axiosWithAuth from './axios';
import axios from 'axios';
axios.defaults.withCredentials = true;

const changeFirstName = (data) => {
  const header = { 'Content-Type': 'application/json' };
  return axiosWithAuth.post('/config/firstName', data, { headers: header });
};

const changeLastName = (data) => {
  const header = { 'Content-Type': 'application/json' };
  return axiosWithAuth.post('/config/lastName', data, { headers: header });
};

const changeEmail = (data) => {
  const header = { 'Content-Type': 'application/json' };
  return axiosWithAuth.post( '/config/email', data, { headers: header });
};

export default {
  changeFirstName,
  changeLastName,
  changeEmail,
};