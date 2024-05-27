import axiosWithAuth from './axios';
import axios from 'axios';

axios.defaults.withCredentials = true;

const getSummary = () => {
  return axiosWithAuth.get('/pagos/summary');
};

const getAll = async () => {
  const response = await axiosWithAuth.get('/pagos');

  return response.data;
};

const add = async (pago) => {
  const header = { 'Content-Type': 'application/json', };
  const response = await axiosWithAuth.post('/pagos', pago, { headers: header });

  return response.data.added;
};

const remove = async (id) => {
  const removeUrl = `/pagos/${id}`;
  const response = await axiosWithAuth.delete(removeUrl);
  return response.data.deleted;
};

const update = async (id, newPago) => {
  const updateUrl = `/pagos/${id}`;
  const header = { 'Content-Type': 'application/json', };
  const response = await axiosWithAuth.put(updateUrl, newPago, { headers: header });
  return response.data.updated;
};


export default {
  getSummary,
  getAll,
  add,
  remove,
  update,
};