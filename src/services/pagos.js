import axios from 'axios'
import { baseUrl } from '../helpers/constants'
axios.defaults.withCredentials = true

const getSummary = (token) => {
  return axios.get(`${baseUrl}/pagos/summary`, { headers: { 'Authorization': `Bearer ${token}` }})
}

const getAll = (token) => {
  return axios.get(
    `${baseUrl}/pagos`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
  )
}

const add = (pago, token) => {
  return axios.post(
    `${baseUrl}/pagos`,
    pago,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    },
  )
}

const remove = (id, token) => {
  return axios.delete(
    `${baseUrl}/pagos/${id}`,
    {
      headers: {
        'Authorization': `Bearer: ${token}`,
      }
    }
  )
}

const update = (id, newPago, token) => {
  return axios.put(
    `${baseUrl}/pagos/${id}`,
    newPago,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  )
}


export default {
  getSummary,
  getAll,
  add,
  remove,
  update,
}